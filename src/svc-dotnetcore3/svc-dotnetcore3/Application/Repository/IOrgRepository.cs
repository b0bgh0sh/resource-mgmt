using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IOrgRepository
    {
        // GET
        Task<IEnumerable<Organizations>> GetAllOrgs();
        Task<Organization> GetAOrg(int id);

        // POST
        Task<Organization> AddAOrg(Organization org);

        // PATCH
        Task<Organization> UpdateAOrg(int id, string name);
        
        // DELETE
        Task<Organization> DeleteAOrg(int id);
    }
}
