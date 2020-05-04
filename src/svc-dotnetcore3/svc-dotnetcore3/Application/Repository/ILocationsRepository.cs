using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface ILocationsRepository
    {
        Task<IEnumerable<Location>> GetAllLocations();
        Task<Location> GetALocation(string locationCode);
        Task<Location> CreateALocation(Location location);
        Task<Location> UpdateALocation(Location location);
        Task<Location> DeleteALocation(string code);
    }
}
