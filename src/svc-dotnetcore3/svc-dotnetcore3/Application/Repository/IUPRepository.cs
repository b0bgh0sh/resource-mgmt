using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IUPRepository
    {
        Task<IEnumerable<UserProject>> GetProject(string username);
        Task<UserProject> GetAProject(string username, string project);
        Task<UserProject> CreateProject(string username, string project);
        Task<Usernames[]> AddMultiUser(string project, Usernames[] users);
        Task<UserProject> DeleteProject(string username, string project);
        Task<UserProject> PutAProject(string username, string project, UserUtil uu);
        Task<UserProject> UpdateProject(string username, string project, int year, Hour hr);
    }
}
