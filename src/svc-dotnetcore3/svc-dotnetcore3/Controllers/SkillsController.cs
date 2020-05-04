using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Controllers
{
     //[Authorize]
    public class SkillsController : ControllerBase
    {
        private readonly ISkillsRepository skillsRepository;
        private readonly IMapper mapper;

        public SkillsController(ISkillsRepository skillsRepository, IMapper mapper)
        {
            this.skillsRepository = skillsRepository;
            this.mapper = mapper;
        }
        
        [HttpGet]
        [Route("/skills")]
        public async Task<ActionResult<IEnumerable<Skill>>> GetAllSkills()
        {
            var response = await skillsRepository.GetAllSkills();
            var viewModel = mapper.Map<IEnumerable<Skill>>(response);
            return Ok(viewModel);
        }
        [HttpGet]
        [Route("/{username}/skills/{discipline}")]
        public async Task<ActionResult<IEnumerable<Skill>>> GetAUserSkills([FromRoute] string username, string discipline)
        {
            var response = await skillsRepository.GetAUserSkills(username, discipline);
            var viewModel = mapper.Map<IEnumerable<Skill>>(response);
            return Ok(viewModel);
        }
        [HttpGet]
        [Route("/skills/d/{discipline}")]
        public async Task<ActionResult<IEnumerable<Skill>>> GetADiscSkills([FromRoute] string discipline)
        {
            var response = await skillsRepository.GetADiscSkills(discipline);
            var viewModel = mapper.Map<IEnumerable<Skill>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/skills/{name}", Name = "GetASkill")]
        public async Task<ActionResult<Skill>> GetASkill(string name)
        {
            var response = await skillsRepository.GetASkill(name);
            var viewModel = mapper.Map<Skill>(response);
            return Ok(viewModel);
        }

        [HttpPut]
        [Route("/skills")]
        public async Task<ActionResult<Skill>> UpdateASkill([FromBody] Skill skill)
        {
            var response = await skillsRepository.UpdateASkill(skill);
            var viewModel = mapper.Map<Skill>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/skills")]
        public async Task<ActionResult<Skill>> AddASkill([FromBody] Skill skill)
        {
            var response = await skillsRepository.AddASkill(skill);
            var viewModel = mapper.Map<Skill>(response);
            return Created("GetASkill", viewModel);
        }

        [HttpDelete]
        [Route("/skills/{name}")]
        public async Task<ActionResult<Skill>> DeleteASkill([FromRoute] string name)
        {
            var response = await skillsRepository.DeleteASkill(name);
            var viewModel = mapper.Map<Skill>(response);
            return Ok(viewModel);
        }

    }
}