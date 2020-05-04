using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly string connectionString = string.Empty;

        public UsersRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var sql = @"
                select
                    U.Id, U.FirstName, U.LastName, U.Username, L.Name as Location, U.Type, O.Name as Organization
                from
                    Users U
                INNER JOIN Locations L
                    on L.Id = U.LocationId
                INNER JOIN Organizations O
                    on O.Id = U.OrganizationId
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<User>(sql);
        }

        public async Task<IEnumerable<User>> GetAllUsersWhere(string organization)
        {
            var sql = @"
                select
                    U.Id, U.FirstName, U.LastName, U.Username, L.Name as Location, U.Type, O.Name as Organization
                from
                    Users U
                INNER JOIN Locations L
                    on L.Id = U.LocationId
                INNER JOIN Organizations O
                    on O.Id = U.OrganizationId
                WHERE OrganizationId = (select Id from Organizations where Name = @Organization)
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<User>(sql, new { Organization = organization});
        }

        public async Task<User> GetAUser(string username)
        {
            var sql = @"
                select
                    U.Id, U.FirstName, U.LastName, U.Username, L.Name as Location, U.Type, O.Name as Organization
                from
                    Users U
                INNER JOIN Locations L
                    on L.Id = U.LocationId
                INNER JOIN Organizations O
                    on O.Id = U.OrganizationId
                where 
                    Username = @Username
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });
        }

        public async Task<IEnumerable<Uname>> GetManagers(string organization)
        {
            var sql = @"
                select
                   Username, FirstName + ' '+ LastName as FullName, Type from Users where ([Type] = 'Resource Manager' or [Type] = 'Project Manager')
                    and OrganizationId = (select Id from Organizations where Name = @Organization)
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Uname>(sql, new { Organization = organization });
        }

        public async Task<User> CreateAUser(User user)
        {
            var sql = @"
                insert into Users 
                    (FirstName, LastName, Username, LocationId, Type, OrganizationId)
                values 
                    (@FirstName, @LastName, @Username, 
                    (select Id from Locations where Name = @Location), @Type,
                    (select Id from Organizations where Name = @Organization));
                select cast(scope_identity() as int);
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var id = await connection.QuerySingleAsync<int>(sql, new
            {
                user.FirstName,
                user.LastName,
                user.Username,
                user.Location,
                user.Type,
                user.Organization

            });
            user.Id = id;
            return user;
        }

        public async Task<User> DeleteAUser(string username)
        {
            var user = await GetAUser(username);
            var sql = @"
                delete from Users where Username = @Username
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { username });
            return user;
        }

        public async Task<User> UpdateAUser(User user)
        {
            var sql = @"
                update Users
                set LocationID = (select Id from Locations where Name = @Location),
                    Type = @Type,
                    OrganizationId = (select Id from Organizations where Name = @Organization)
                where Username = @Username;
            ";
            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { user.Location, user.Type, user.Organization, user.Username });
            return await GetAUser(user.Username);
        }
    }
}
