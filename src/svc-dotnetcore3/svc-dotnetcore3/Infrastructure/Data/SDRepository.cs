using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class SDRepository : ISDRepository
    {
        private readonly string connectionString = string.Empty;

        public SDRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<IEnumerable<UserSD>> GetASD(string username)
        {
            var sql = @"
                select Username, S.Name as Skill, D.Name as Discipline, ISNULL(RTRIM(LTRIM(UWD.Year)), '0') as YOE
                from Users
                INNER JOIN UserHasSkills USD
                 on USD.UserId = Users.Id
                INNER JOIN Skills S
                 on S.DisciplineId = USD.DisciplineId
                AND S.Id = USD.SkillId
                INNER JOIN Disciplines D
                 on D.Id = USD.DisciplineId
				FULL JOIN UserWorksDiscipline UWD
				 on UWD.UserId = USD.UserId
				 AND UWD.DisciplineId = USD.DisciplineId
                WHERE Username = @Username;
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<UserSD>(sql, new { username });
        }

        public async Task<UserSD> GetAS(string username, string skill)
        {
            var sql = @"
                select Username, S.Name as Skill, D.Name as Discipline, ISNULL(RTRIM(LTRIM(UWD.Year)), '0') as YOE
                from Users
                INNER JOIN UserHasSkills USD
                 on USD.UserId = Users.Id
                INNER JOIN Skills S
                 on S.DisciplineId = USD.DisciplineId
                AND S.Name = @Skill
                AND S.Id = USD.SkillId
                INNER JOIN Disciplines D
                 on D.Id = USD.DisciplineId
				FULL JOIN UserWorksDiscipline UWD
				 on UWD.UserId = USD.UserId
				 AND UWD.DisciplineId = USD.DisciplineId
                WHERE Username = @Username
                    
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<UserSD>(sql, new { username, skill });
        }

        public async Task<IEnumerable<UserSD>> GetAD(string username, string discipline)
        {
            var sql = @"
                select Username, S.Name as Skill, D.Name as Discipline, ISNULL(RTRIM(LTRIM(UWD.Year)), '0') as YOE
                from Users
                INNER JOIN UserHasSkills USD
                 on USD.UserId = Users.Id
                INNER JOIN Skills S
                 on S.DisciplineId = USD.DisciplineId
                AND S.Id = USD.SkillId
                INNER JOIN Disciplines D
                 on D.Id = USD.DisciplineId
                AND D.Name = @Discipline
				FULL JOIN UserWorksDiscipline UWD
				 on UWD.UserId = USD.UserId
				 AND UWD.DisciplineId = USD.DisciplineId
                WHERE Username = @Username
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<UserSD>(sql, new { username, discipline });
        }


        public async Task<UserSD> CreateASD(UserSD usd)
        {
            var sql = @"
                insert into UserHasSkills 
                    (UserId, DisciplineId, SkillId)
                values 
                    ((select Id from Users where Username = @Username),
                     (select Id from Disciplines where Disciplines.Name = @Discipline),
                     (select Id from Skills where Skills.Name = @Skill))
            ;
                if not exists  (select * FROM UserWorksDiscipline where
                                UserId = (select Id from Users where Username = @Username)
                                and DisciplineId = (select Id from Disciplines where Disciplines.Name = @Discipline))
                        insert into  UserWorksDiscipline
                                (UserId, DisciplineId, Year)
                                                 values
                                ((select Id from Users where Username = @Username),
                                (select Id from Disciplines where Name = @Discipline),
                                         RTRIM(LTRIM(@Year)));

";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new
            {
                Username = usd.Username,
                Discipline = usd.Discipline,
                Skill = usd.Skill,
                Year = usd.yoe

            });
            return usd;
        }

        public async Task<UserSD> DeleteAS(string username, string discipline, string skill)
        {
            var user = await GetAS(username, skill);
            var sql = @"
                delete from UserHasSkills
                    where UserId = (select Id from Users where Username = @Username)
                    AND SkillId = (select Id from Skills where Name = @Skill)
                    AND DisciplineId = (select Id from Disciplines where Name = @Discipline);
             ";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { Username = username, Skill = skill, Discipline = discipline });
            return user;
        }

        public async Task<IEnumerable<UserSD>> DeleteAD(string username, string discipline)
        {
            var user = await GetAD(username, discipline);
            var sql = @"
                delete from UserHasSkills
                    where UserId = (select Id from Users where Username = @Username)
                    AND DisciplineId = (select Id from Disciplines where Name = @Discipline)
                delete from UserWorksDiscipline
                    where UserId = (select Id from Users where Username = @Username)
                    AND DisciplineId = (select Id from Disciplines where Name = @Discipline);
             ";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { Username = username, Discipline = discipline});
            return user;
        }

        public async Task<IEnumerable<UserSD>> UpdateASD(UserSD usd)
        {
            var sql = @"
                update UserHasSkills
                    set SkillId = (select Id from Skills where Name = @Skill),
                        DisciplineId = (select Id from Disciplines where Name = @Discipline)
                    where UserId = (select Id from Users where Username = @Username)    
            ;
                 update UserWorksDiscipline
                    set DisciplineId = (select Id from Disciplines where Name = @Discipline),
                        Year = RTRIM(LTRIM(@Year))
                    where UserId = (select Id from Users where Username = @Username);";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { Skill = usd.Skill, Discipline = usd.Discipline,
                Username = usd.Username, Year = usd.yoe });
            return await GetASD(usd.Username);
        }

        public async Task<IEnumerable<UserSD>> PatchASD(string username, string discipline, string yoe)
        {
            var sql = @"
                 update UserWorksDiscipline
                    set Year = RTRIM(LTRIM(@Year))
                    where UserId = (select Id from Users where Username = @Username) and
                          DisciplineId = (select Id from Disciplines where Name = @Discipline);";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new
            {
                Username = username,
                Discipline = discipline,
                Year = yoe
            });
            return await GetASD(username);
        }
    }
}
