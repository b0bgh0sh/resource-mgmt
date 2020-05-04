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
    public class DisciplinesController : ControllerBase
    {
        private readonly IDisciplinesRepository disciplinesRepository;
        private readonly IMapper mapper;

        public DisciplinesController(IDisciplinesRepository disciplinesRepository, IMapper mapper)
        {
            this.disciplinesRepository = disciplinesRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("/disciplines")]
        public async Task<ActionResult<IEnumerable<Discipline>>> GetAllDisciplines()
        {
            var response = await disciplinesRepository.GetAllDisciplines();
            var viewModel = mapper.Map<IEnumerable<Discipline>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/disciplines/{name}", Name = "GetADiscipline")]
        public async Task<ActionResult<Discipline>> GetADiscipline(string name)
        {
            var response = await disciplinesRepository.GetADiscipline(name);
            var viewModel = mapper.Map<Discipline>(response);
            return Ok(viewModel);
        }

        [HttpPut]
        [Route("/disciplines")]
        public async Task<ActionResult<Discipline>> UpdateADiscipline([FromBody] Discipline discipline)
        {
            var response = await disciplinesRepository.UpdateADiscipline(discipline);
            var viewModel = mapper.Map<Discipline>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/disciplines")]
        public async Task<ActionResult<Discipline>> AddADiscipline([FromBody] Discipline discipline)
        {
            var response = await disciplinesRepository.AddADiscipline(discipline);
            var viewModel = mapper.Map<Discipline>(response);
            return Created("GetADiscipline", viewModel);
        }

        [HttpDelete]
        [Route("/disciplines/{name}")]
        public async Task<ActionResult<Discipline>> DeleteADiscipline(string name)
        {
            var response = await disciplinesRepository.DeleteADisicipline(name);
            var viewModel = mapper.Map<Discipline>(response);
            return Ok(viewModel);
        }
    }
}