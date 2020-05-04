using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IUsersRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<IEnumerable<User>> GetAllUsersWhere(string organization);
        Task<User> GetAUser(string username);
        Task<IEnumerable<Uname>> GetManagers(string organization);
        Task<User> DeleteAUser(string username);
        Task<User> CreateAUser(User user);
        Task<User> UpdateAUser(User user);
        // Task<User> GetALocation(string username);
    }
}
