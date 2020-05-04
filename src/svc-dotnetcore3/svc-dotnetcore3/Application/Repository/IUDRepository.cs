using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IUDRepository
    {
        Task<IEnumerable<UserDiscipline>> GetDiscipline(string username);
        Task<UserDiscipline> CreateDiscipline(string username, UserDiscipline ud);
    }
}
