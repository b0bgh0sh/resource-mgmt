using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class SearchRepository : ISearchRepository
    {
        private readonly string connectionString = string.Empty;

        public SearchRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        //return a list of user based on discipline, skill, location, year, availability in a given date range
        public async Task<IEnumerable<UserInSearch>> GetAllUsers(Search search, string organization)
        {
            // find candidates and insert them into @searchUser table
            var sql = @"
                DECLARE @searchUser TABLE (
                    Id INT, 
                    Username NVARCHAR(50),
                    Location NVARCHAR(100),
                    Type NVARCHAR(50),
                    Discipline NVARCHAR(100),
                    Skill NVARCHAR(100),
                    YOE NVARCHAR(50),
                    Organization NVARCHAR(50)
                );

                INSERT INTO @searchUser
                SELECT DISTINCT
                    U.Id, U.Username,
                    L.Name AS 'Location', U.Type, D.Name AS 'Discipline', S.Name AS 'Skill',
                    UWD.Year AS 'YOE', O.Name AS 'Organization'

                FROM 
                    Users U";

            // return all skills and disciplines if skill is searched
            // return all disciplines if disicipline is searched
            // otherwise return only 1 discipline and 1 skill
            if (search.Skill != null) {
                sql += @" 
                    LEFT JOIN UserWorksDiscipline UWD ON U.Id = UWD.UserId
                    LEFT JOIN UserHasSkills UHS ON U.Id = UHS.UserId";
            } else if (search.Discipline != null) {
                sql += @"
                    LEFT JOIN UserWorksDiscipline UWD ON U.Id = UWD.UserId
                    LEFT JOIN (
                        SELECT UHS.UserId, MIN(UHS.SkillId) AS 'SkillId'
                        FROM UserHasSkills UHS
                        GROUP BY UHS.UserId
                    ) UHS ON UHS.UserId = U.Id";
            } else {
                sql += @"
                    LEFT JOIN (
                        SELECT UWD.UserId, MIN(UWD.DisciplineId) AS 'DisciplineId', UWD.Year
                        FROM UserWorksDiscipline UWD
                        GROUP BY UWD.UserId, UWD.Year
                    ) UWD ON UWD.UserId = U.Id
                    LEFT JOIN (
                        SELECT UHS.UserId, MIN(UHS.SkillId) AS 'SkillId'
                        FROM UserHasSkills UHS
                        GROUP BY UHS.UserId
                    ) UHS ON UHS.UserId = U.Id";
            }

            sql += @"
                    LEFT JOIN Locations L ON U.LocationId = L.Id
                    LEFT JOIN Disciplines D ON UWD.DisciplineId = D.Id
                    LEFT JOIN Skills S ON S.Id = UHS.SkillId AND S.DisciplineId = D.Id
                    LEFT JOIN Organizations O ON O.Id = U.OrganizationId    
                WHERE 
                    O.Name = @Organization AND";

            if ((search.Discipline != null) && search.Discipline.Trim() != "") {
                sql += @" 
                    RTRIM(LTRIM(D.Name)) = LTRIM(@Discipline) AND";
            }
            if (search.Skill != null && search.Skill.Trim() != "") {
                sql += @" 
                    RTRIM(LTRIM(S.Name)) = LTRIM(@Skill) AND";
            }
            if (search.Location != null && search.Location.Trim() != "") {
                sql += @" 
                    RTRIM(LTRIM(L.Name)) = LTRIM(@Location) AND";
            }
            if (search.YOE != null) {
                sql += @" 
                    RTRIM(LTRIM(UWD.Year)) = LTRIM(@YOE) AND";
            }

            // remove the last AND
            sql = sql.Substring(0, sql.Length-3);

            // compute availability
            sql += @"

                SELECT *
                FROM (
                    SELECT *";

            if (search.FromDate != null && search.ToDate != null) {
                int month_diff = ((search.ToDate.Year - search.FromDate.Year) * 12) + search.ToDate.Month - search.FromDate.Month;
                if (month_diff < 0) {
                    throw new ArgumentException(nameof(search.FromDate) + " is greater than " + nameof(search.ToDate));
                }
                int year = search.FromDate.Year;
                int month = search.FromDate.Month;     
                sql += @", ISNULL((
                        SELECT CONVERT(FLOAT, 1-SUM(UH.Hours/176.0/" + (month_diff + 1) + "))" + @"
                        FROM UserHours UH
                        WHERE
                            U.Id = UH.UserId
                            AND ((UH.Year = " + year + " AND UH.Month = " + month + ")";
                month++;
                for (int i = 0; i < month_diff; i++) {
                    if (month >= 13) {
                        year += 1;
                        month = 1;
                    }
                    sql += @"
                                OR (UH.Year = " + year + " AND UH.Month = " + month + ")";
                    month++;
                }
                sql += @"
                            ) 
                        GROUP BY UH.UserId), 1) AS 'Availability'";
            }

            sql += @"
                    FROM @searchUser U
                ) AS SearchUser";
            
            if (search.FromDate != null && search.ToDate != null) {
                // TODO frontend needs to prevent string or other input for availability
                sql += @" 
                WHERE SearchUser.Availability >= @Availability/100.0";
            }
           
            sql += ";";
            
            // for debug
            // Console.WriteLine(sql);

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<UserInSearch>(sql, new {
                search.Discipline,
                search.Skill,
                search.Location,
                search.YOE,
                search.FromDate,
                search.ToDate,
                search.Availability,
                Organization = organization
            });
        }

        // return a list of projects from search
        public async Task<IEnumerable<Project>> GetAllProjects(Search search)
        {
            var sql = @"
                SELECT DISTINCT 
                    P.Id, P.Number, P.Title, L.Name, P.CreatedAt, P.UpdatedAt, 
                    PS.FromDate, PS.ToDate, PS.Status, 
                    (SELECT CONCAT(U.FirstName, ' ', U.LastName)) AS 'PM', 
                    D.Name, O.Name
                FROM 
                    Projects P
                    LEFT JOIN Locations L ON P.LocationId = L.Id
                    LEFT JOIN ProjectStatus PS ON P.Id = PS.Id
                    LEFT JOIN Disciplines D ON D.Id = PS.DisciplineId
                    LEFT JOIN Organizations O ON O.Id = PS.OrganizationId
                    LEFT JOIN Users U ON U.Id = PS.PM
                WHERE    ";

            if (search.ProjectNumber != null) {
                sql += " RTRIM(LTRIM(P.Number)) = @ProjectNumber AND";                
            }
            if (search.Location != null) {
                sql += " RTRIM(LTRIM(L.Name)) = @Location AND";
            }
            if (search.ProjectStatus != null) {
                sql += " RTRIM(LTRIM(PS.Status)) = @ProjectStatus AND";
            }
            if (search.PMFirstName != null) {
                sql += " RTRIM(LTRIM(U.FirstName)) = @PMFirstName AND";
            }
            if (search.PMLastName != null) {
                sql += " RTRIM(LTRIM(U.LastName)) = @PMLastName AND";
            }
            if (search.Discipline != null) {
                sql += " RTRIM(LTRIM(D.Name)) = @Discipline AND";
            }
            if (search.Organization != null) {
                sql += " RTRIM(LTRIM(O.Name)) = @Organization AND";
            }

            // remove the last AND
            sql = sql.Substring(0, sql.Length-3);

            sql += ";";            

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Project>(sql, new {
                search.ProjectNumber,
                search.Location,
                search.ProjectStatus,
                search.PMFirstName,
                search.PMLastName,
                search.Discipline,
                search.Organization
            });
        }
    }
}
