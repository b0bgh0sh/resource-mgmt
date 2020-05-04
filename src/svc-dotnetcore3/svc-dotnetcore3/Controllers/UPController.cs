using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Controllers
{
    //[Authorize]
    public class UPController : ControllerBase
    {
        private readonly IUPRepository upRepository;
        private readonly IMapper mapper;

        public UPController(IUPRepository upRepository, IMapper mapper)
        {
            this.upRepository = upRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("/userprojects/{username}")]
        public async Task<ActionResult<IEnumerable<UserProject>>> GetProject([FromRoute]string username)
        {
            var response = await upRepository.GetProject(username);
            var viewModel = mapper.Map<IEnumerable<UserProject>>(response);
            return Ok(viewModel);
        }
        [HttpGet]
        [Route("/userprojects/{username}/{project}")]
        public async Task<ActionResult<UserProject>> GetAProject([FromRoute]string username, string project)
        {
            var response = await upRepository.GetAProject(username, project);
            var viewModel = mapper.Map<UserProject>(response);
            return Ok(viewModel);
        }
        [HttpPost]
        [Route("/userprojects/{username}/{project}")]
        public async Task<ActionResult<UserProject>> CreateProject([FromRoute]string username, string project)
        {
            var response = await upRepository.CreateProject(username, project);
            var viewModel = mapper.Map<UserProject>(response);
            return Created("GetProject", viewModel);
        }

        [HttpPost]
        [Route("/userprojects/multi/{project}")]
        public async Task<ActionResult<Usernames[]>> AddMultiUser([FromRoute]string project, [FromBody] Usernames[] users)
        {
            var response = await upRepository.AddMultiUser(project, users);
            var viewModel = mapper.Map<Usernames[]>(response);
            return Created("GetProject",viewModel);
        }

        [HttpDelete]
        [Route("/userprojects/{username}/{project}")]
        public async Task<ActionResult<UserProject>> DeleteProject([FromRoute]string username, string project)
        {
            var response = await upRepository.DeleteProject(username, project);
            var viewModel = mapper.Map<UserProject>(response);
            return Ok(viewModel);
        }

        [HttpPut]
        [Route("/userprojects/{username}/{project}")]
        public async Task<ActionResult<UserProject>> PutAProject([FromRoute]string username,
            string project, [FromBody] UserUtil uu)
        {
            var response = await upRepository.PutAProject(username, project, uu);
            var viewModel = mapper.Map<UserProject>(response);
            return Ok(viewModel);
        }
        [HttpPatch]
        [Route("/userprojects/{username}/{project}/{year}")]
        public async Task<ActionResult<UserProject>> UpdateProject([FromRoute]string username,
            string project, int year, [FromBody] Hour hr)
        {
            var response = await upRepository.UpdateProject(username, project, year, hr);
            var viewModel = mapper.Map<UserProject>(response);
            return Ok(viewModel);
        }
    }
}