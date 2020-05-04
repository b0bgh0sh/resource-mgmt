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
    public class OrgController : ControllerBase
    {
        private readonly IOrgRepository orgRepository;
        private readonly IMapper mapper;

        public OrgController(IOrgRepository orgRepository, IMapper mapper)
        {
            this.orgRepository = orgRepository;
            this.mapper = mapper;
        }
        
        [HttpGet]
        [Route("/org")]
        public async Task<ActionResult<IEnumerable<Organizations>>> GetAllOrgs()
        {
            var response = await orgRepository.GetAllOrgs();
            var viewModel = mapper.Map<IEnumerable<Organizations>>(response);
            return Ok(viewModel);
        }
        [HttpGet]
        [Route("/org/{id}", Name = "GetAOrg")]
        public async Task<ActionResult<Organization>> GetAOrg([FromRoute] int id)
        {
            var response = await orgRepository.GetAOrg(id);
            var viewModel = mapper.Map<Organization>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/org")]
        public async Task<ActionResult<Organization>> AddAOrg([FromBody] Organization org)
        {
            var response = await orgRepository.AddAOrg(org);
            var viewModel = mapper.Map<Organization>(response);
            return Created("GetAOrg", viewModel);
        }

        [HttpPatch]
        [Route("/org/id/{name}")]
        public async Task<ActionResult<Organization>> UpdateAOrg([FromRoute] int id, string name)
        {
            var response = await orgRepository.UpdateAOrg(id, name);
            var viewModel = mapper.Map<Organization>(response);
            return Ok(viewModel);
        }

        [HttpDelete]
        [Route("/org/{id}")]
        public async Task<ActionResult<Organization>> DeleteAOrg([FromRoute] int id)
        {
            var response = await orgRepository.DeleteAOrg(id);
            var viewModel = mapper.Map<Organization>(response);
            return Ok(viewModel);
        }

    }
}