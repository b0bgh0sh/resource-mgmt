using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class OrgRepository : IOrgRepository
    {
        private readonly string connectionString = string.Empty;

        public OrgRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }


        public async Task<IEnumerable<Organizations>> GetAllOrgs()
        {
            var sql = @"
                select Id, Name, 
                (Select Count (Distinct U.Id) from Users U Where U.OrganizationId = O.Id)
                as Num
                from Organizations O
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Organizations>(sql);
        }

        public async Task<Organization> GetAOrg(int id)
        {
            var sql = @"
                select * from Organizations
                where id = @Id
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<Organization>(sql, new { Id = id });
        }

        public async Task<Organization> AddAOrg(Organization org)
        {
            var sql = @"
                insert into Organizations
                (Name)
                values(@Name);
                select cast(scope_identity() as int);
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var id = await connection.QuerySingleAsync<int>(sql, new { Name = org.Name });
            org.Id = id;
            return org;

        }

        public async Task<Organization> UpdateAOrg(int id, string name)
        {
            var sql = @"
                update Organizations
                set Name = @Name
                where Id = @Id               
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { Id = id, Name = name });
            return await GetAOrg(id);
        }

        public async Task<Organization> DeleteAOrg(int id)
        
        {
            var org = await GetAOrg(id);
            var sql = @"
                delete from Organizations
                where id = @Id
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { Id = id});
            return org;
        }

    }
}
