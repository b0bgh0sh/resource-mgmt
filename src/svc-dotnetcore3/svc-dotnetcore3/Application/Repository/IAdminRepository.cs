using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IAdminRepository
    {
        Task<IEnumerable<Admin>> GetAllAdmins();
        Task<Admin> GetAAdmin(string username);
        Task<Admin> CheckAAdmin(string username, string password);
        Task<Admin> DeleteAAdmin(string username);
        Task<Admin> CreateAAdmin(Admin admin);
        Task<Admin> UpdateAAdmin(string password, Admin admin);
    }
}
