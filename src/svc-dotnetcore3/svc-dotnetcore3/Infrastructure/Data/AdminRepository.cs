using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class AdminRepository : IAdminRepository
    {
        private readonly string connectionString = string.Empty;

        public AdminRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<IEnumerable<Admin>> GetAllAdmins()
        {
            var sql = @"
                select
                    Username, Password
                from
                    Admin
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Admin>(sql);
        }

        public async Task<Admin> GetAAdmin(string username)
        {
            var sql = @"
                select
                    Username, Password
                from
                    Admin
                where 
                    Username = @Username
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<Admin>(sql, new { Username = username });
        }

        public async Task<Admin> CheckAAdmin(string username, string password)
        {
            var sql = @"
                    select
                    Username , Password
                    from Admin
                    where Username = @Username
                    and  Password = @Password
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<Admin>(sql,
                new { Username = username, Password = password });
        }

        public async Task<Admin> CreateAAdmin(Admin admin)
        {
            var sql = @"
                insert into Admin 
                    (Username, Password)
                values 
                    (@Username, @Password);
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var un = await connection.QuerySingleAsync<String>(sql, new
            {
                admin.Username,
                admin.Password
            }) ;
            admin.Username = un;
            return admin;
        }

        public async Task<Admin> DeleteAAdmin(string username)
        {
            var admin = await GetAAdmin(username);
            var sql = @"
                delete from Admin where Username = @Username
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { username });
            return admin;
        }
        public async Task<Admin> UpdateAAdmin(string password, Admin admin)
        {
            var sql = @"
                update Admin
                set Password = @nPassword
                where Username = @Username and Password = @Password
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { nPassword = password,
            Username = admin.Username, Password = admin.Password});
            admin.Password = password;
            return admin;
        }
    }
}
