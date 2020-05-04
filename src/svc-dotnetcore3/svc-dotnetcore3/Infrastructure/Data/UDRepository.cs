using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class UDRepository : IUDRepository
    {
        private readonly string connectionString = string.Empty;

        public UDRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        
        public async Task<IEnumerable<UserDiscipline>> GetDiscipline(string username)
        {
            var sql = @"
                select D.Name as Discipline, RTRIM(LTRIM(UWD.Year)) as YOE
                    from UserWorksDiscipline UWD
                    INNER JOIN Disciplines D
                    on UWD.DisciplineId = D.Id

                where UWD.UserId = 
                  (select Id from Users where Username = @Username)
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<UserDiscipline>(sql, new { Username = username });
        }

        public async Task<UserDiscipline> CreateDiscipline(string username, UserDiscipline ud)
        {
            var sql = @"
                declare @num int;
                set @num = (select count(distinct DisciplineId) from UserWorksDiscipline where UserId = 
                (select Id from Users where Username = @Username));

				if @num < 5
                insert into  UserWorksDiscipline
                    (UserId, DisciplineId, Year)
                values
                   ((select Id from Users where Username = @Username),
                    (select Id from Disciplines where Name = @Discipline),
                    RTRIM(LTRIM(@Year)));
                ELSE
				THROW 51000, 'Cannot Add More Than 5 Disciplines.', 1;
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { Username = username, Discipline  = ud.Discipline, Year = ud.YOE });
            return ud; 
        }

    }
}
