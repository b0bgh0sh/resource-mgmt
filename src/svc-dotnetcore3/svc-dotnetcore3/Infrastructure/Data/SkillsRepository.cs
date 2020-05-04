using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class SkillsRepository : ISkillsRepository
    {
        private readonly string connectionString = string.Empty;

        public SkillsRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<IEnumerable<Skill>> GetAllSkills()
        {
            var sql = @"
                SELECT S.Id, S.DisciplineId, S.Name,

                    (SELECT D.Name
                    FROM Disciplines D
                    WHERE D.Id = S.DisciplineId) AS 'DisciplineName',

                    (SELECT Count(DISTINCT UHS.UserId)
                        FROM UserHasSkills UHS
                        WHERE UHS.SkillId = S.Id
                            AND UHS.DisciplineId = S.DisciplineId
                        GROUP BY UHS.SkillId
                    ) AS 'NumberOfPeople'

                FROM Skills S
                ORDER BY S.DisciplineId, S.Id
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Skill>(sql);
        }
        public async Task<IEnumerable<Skill>> GetAUserSkills(string username, string discipline)
        {
            var sql = @"
                SELECT Id, DisciplineId, Name
                FROM Skills
                where Id in (select SkillId from UserHasSkills where 
                            UserId = (select Id from Users where Username = @Username) and
                            DisciplineId = (select Id from Disciplines where Name = @Discipline)) and
                DisciplineId = (select Id from Disciplines where Name = @Discipline)
      
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Skill>(sql, new { Username = username, Discipline = discipline});
        }
        public async Task<IEnumerable<Skill>> GetADiscSkills(string discipline)
        {
            var sql = @"
                SELECT Id, DisciplineId, Name
                FROM Skills
                where 
                DisciplineId = (select Id from Disciplines where Name = @Discipline)
      
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Skill>(sql, new { Discipline = discipline });
        }

        public async Task<Skill> GetASkill(string name)
        {
            var sql = @"
                SELECT S.Id, S.DisciplineId, S.Name, 
                    
                    (SELECT D.Name
                    FROM Disciplines D
                    WHERE D.Id = S.DisciplineId) AS 'DisciplineName',

                    ISNULL((SELECT Count(DISTINCT UHS.UserId)
                        FROM UserHasSkills UHS
                        WHERE UHS.SkillId = S.Id
                            AND UHS.DisciplineId = S.DisciplineId
                        GROUP BY UHS.SkillId
                    ),0) AS 'NumberOfPeople'

                FROM Skills S
                WHERE S.Name = @Name
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<Skill>(sql, new { Name = name });
        }

        public async Task<Skill> UpdateASkill(Skill skill)
        {
            var sql = @"
                UPDATE Skills
                SET Name = @Name
                WHERE Id = @Id 
                    AND DisciplineId = @DisciplineId
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            int result = await connection.ExecuteAsync(sql, new
            {
                skill.Id,
                skill.DisciplineId,
                skill.Name
            });
            return result == 1 ? skill : null;
        }

        public async Task<Skill> AddASkill(Skill skill)
        {
            var sql = @"
                declare @did int;
                set @did  = (select D.Id From Disciplines D
                            Where D.Name  =  @DisciplineName)
                IF (Select * from  Skills where Name  = @Name
                    and DisciplineId =  @did) IS NULL
                BEGIN
                INSERT INTO Skills (Name, DisciplineId)
                VALUES (@Name, @did);

                select cast(scope_identity() as int);
                END
                ELSE
                THROW 54000, 'The Skill Already Exists.', 1;
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var id = await connection.QuerySingleAsync<int>(sql, new
            {
                skill.DisciplineName,
                skill.Name
            });
            skill.Id = id;
            return skill;
        }

        public async Task<Skill> DeleteASkill(string name)
        {
            var skill = await GetASkill(name);
            var sql = @"
                IF (SELECT TOP 1
                    ISNULL((SELECT Count(DISTINCT UHS.UserId)
                        FROM UserHasSkills UHS
                        WHERE UHS.SkillId = S.Id
                            AND UHS.DisciplineId = S.DisciplineId
                        GROUP BY UHS.SkillId
                    ),0)  FROM Skills S
                WHERE S.Name = @Name) =  0
				DELETE FROM Skills where Name = @Name
				ELSE
				THROW 60000 , 'Cannot Delete A Skill Which Has Users Belonging To It', 1
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var param = new { 
                Name = name, 
            };
            await connection.ExecuteAsync(sql, param);
            return skill;
        }

    }
}
