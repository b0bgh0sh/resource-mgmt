using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface IPURepository
    {
        Task<IEnumerable<ProjectUtil>> GetProjectUtil(string project);
        Task<IEnumerable<ProjectUtil>> ForecastProject(string project);
    }
}
