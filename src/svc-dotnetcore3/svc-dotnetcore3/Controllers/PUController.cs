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
    public class PUController : ControllerBase
    {
        private readonly IPURepository puRepository;
        private readonly IMapper mapper;

        public PUController(IPURepository puRepository, IMapper mapper)
        {
            this.puRepository = puRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("/util/{project}")]
        public async Task<ActionResult<IEnumerable<ProjectUtil>>> GetProjectUtil([FromRoute]string project)
        {
            var response = await puRepository.GetProjectUtil(project);
            var viewModel = mapper.Map<IEnumerable<ProjectUtil>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/forecast/project/{project}")]
        public async Task<ActionResult<IEnumerable<ProjectUtil>>> ForecastProject([FromRoute]string project)
        {
            var response = await puRepository.ForecastProject(project);
            var viewModel = mapper.Map<IEnumerable<ProjectUtil>>(response);
            return Ok(viewModel);
        }
    }
}