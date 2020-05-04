using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Controllers
{
    //  [Authorize]
    public class SearchController : ControllerBase
    {
        private readonly ISearchRepository searchRepository;
        private readonly IMapper mapper;

        public SearchController(ISearchRepository searchRepository, IMapper mapper)
        {
            this.searchRepository = searchRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("/search/users/{organization}")]
        public async Task<ActionResult<IEnumerable<UserInSearch>>> GetAllUsers([FromBody] Search search, [FromRoute] string organization)
        {
            var response = await searchRepository.GetAllUsers(search, organization);
            var viewModel = mapper.Map<IEnumerable<UserInSearch>>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/search/projects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects([FromBody] Search search)
        {
            var response = await searchRepository.GetAllProjects(search);
            var viewModel = mapper.Map<IEnumerable<Project>>(response);
            return Ok(viewModel);
        }
    }
}