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
    public class UUController : ControllerBase
    {
        private readonly IUURepository uuRepository;
        private readonly IMapper mapper;

        public UUController(IUURepository uuRepository, IMapper mapper)
        {
            this.uuRepository = uuRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("/util/user/{username}")]
        public async Task<ActionResult<IEnumerable<UserUtil>>> GetUserUtil([FromRoute]string username)
        {
            var response = await uuRepository.GetUserUtil(username);
            var viewModel = mapper.Map<IEnumerable<UserUtil>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/project/{project}")]
        public async Task<ActionResult<IEnumerable<UserUtil>>> GetProjectData([FromRoute]string project)
        {
            var response = await uuRepository.GetProjectData(project);
            var viewModel = mapper.Map<IEnumerable<UserUtil>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/util/{org}/{year}")]
        public async Task<ActionResult<IEnumerable<OrgUtil>>> ForecastOrganization([FromRoute]string org, int year)
        {
            var response = await uuRepository.ForecastOrganization(org, year);
            var viewModel = mapper.Map<IEnumerable<OrgUtil>>(response);
            return Ok(viewModel);
        }
    }
}