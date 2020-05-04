using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;

namespace Web.API.Application.Repository
{
    public interface ISkillsRepository
    {
        // GET
        Task<IEnumerable<Skill>> GetAllSkills();
        Task<IEnumerable<Skill>> GetAUserSkills(string username,  string discipline);
        Task<IEnumerable<Skill>> GetADiscSkills(string discipline);
        Task<Skill> GetASkill(string name);

        // POST
        Task<Skill> AddASkill(Skill skill);

        // PUT
        Task<Skill> UpdateASkill(Skill skill);
        
        // DELETE
        Task<Skill> DeleteASkill(string name);
    }
}
