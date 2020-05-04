using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
    public class LocationsRepository : ILocationsRepository
    {
        private readonly string connectionString = string.Empty;

        public LocationsRepository(string connectionString)
        {
            this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<IEnumerable<Location>> GetAllLocations()
        {
            var sql = @"
                SELECT *,
                    (SELECT Count(DISTINCT Id)
                        FROM Users
                        WHERE LocationId = L.Id
                        GROUP BY LocationId
                    ) AS 'NumberOfPeople'
                FROM Locations L
                ORDER BY L.Name
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryAsync<Location>(sql);
        }

        public async Task<Location> GetALocation(string locationCode)
        {
            var sql = @"
                select
                    Id, Code, [Name]
                from
                    Locations
                where 
                    Code = @Code
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return await connection.QueryFirstOrDefaultAsync<Location>(sql, new { Code = locationCode });
        }

        public async Task<Location> CreateALocation(Location location)
        {
            var sql = @"
                insert into Locations 
                    (Code, Name)
                values 
                    (@Code, @Name);
                select cast(scope_identity() as int);
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var id = await connection.QuerySingleAsync<int>(sql, new {
                location.Code,
                location.Name
            });
            location.Id = id;
            return location;
        }

        public async Task<Location> UpdateALocation(Location location)
        {
            var sql = @"
                UPDATE Locations
                SET Code = @Code,
                    Name = @Name
                WHERE Id = @Id
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            int result = await connection.ExecuteAsync(sql, new
            {
                location.Id,
                location.Code,
                location.Name
            });
            return result == 1 ? location : null;
        }

        public async Task<Location> DeleteALocation(string code)
        {
            var location = await GetALocation(code);
            var sql = @"
                DELETE FROM Locations
                WHERE Code = @Code
            ;";

            using var connection = new SqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(sql, new { code });
            return location;
        }
    }
}
