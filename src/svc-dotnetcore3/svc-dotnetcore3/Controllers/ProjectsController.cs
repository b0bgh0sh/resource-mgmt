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
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsRepository projectsRepository;
        private readonly IMapper mapper;

        public ProjectsController(IProjectsRepository projectsRepository, IMapper mapper)
        {
            this.projectsRepository = projectsRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("/projects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            var response = await projectsRepository.GetAllProjects();
            var viewModel = mapper.Map<IEnumerable<Project>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/projects/{projectNumber}", Name = "GetAProject")]
        public async Task<ActionResult<Project>> GetAProject(string projectNumber)
        {
            var response = await projectsRepository.GetAProject(projectNumber);
            var viewModel = mapper.Map<Project>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/projects/most-recent")]
        public async Task<ActionResult<IEnumerable<Project>>> GetMostRecentProjects()
        {
            var response = await projectsRepository.GetMostRecentProjects();
            var viewModel = mapper.Map<IEnumerable<Project>>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/projects")]
        public async Task<ActionResult<ProjectStatus>> CreateAProject([FromBody] ProjectCreate project)
        {
            var response = await projectsRepository.CreateAProject(project);
            var viewModel = mapper.Map<ProjectStatus>(response);
            return Created("GetAProject", viewModel);
        }

        [HttpPut]
        [Route("/projects")]
        public async Task<ActionResult<Project>> UpdateAProject([FromBody] Project project)
        {
            var response = await projectsRepository.UpdateAProject(project);
            var viewModel = mapper.Map<Project>(response);
            return Accepted(viewModel);
        }

        [HttpPut]
        [Route("/projectstatus/{project}")]
        public async Task<ActionResult<ProjectStatus>> UpdateProjectStatus([FromRoute] string project, [FromBody] UserUtil uu)
        {
            var response = await projectsRepository.UpdateProjectStatus(project, uu);
            var viewModel = mapper.Map<ProjectStatus>(response);
            return Ok(viewModel);
        }

        [HttpDelete]
        [Route("/projects/{project}")]
        public async Task<ActionResult<Project>> DeleteAProject([FromRoute] string project)
        {
            var response = await projectsRepository.DeleteAProject(project);
            var viewModel = mapper.Map<Project>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/projects/title/{project}")]
        public async Task<ActionResult<Project>> GetAProjectWithTitle([FromRoute]string project)
        {
            var response = await projectsRepository.GetAProjectWithTitle(project);
            var viewModel = mapper.Map<Project>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/check/{project}")]
        public async Task<ActionResult<IEnumerable<ProjectStatus>>> CheckAProject([FromRoute] string project)
        {
            var response = await projectsRepository.CheckAProject(project);
            var viewModel = mapper.Map<IEnumerable<ProjectStatus>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/activatedlist/org/{org}")]
        public async Task<ActionResult<IEnumerable<ProjectStatus>>> GetActivatedProjects(string org)
        {
            var response = await projectsRepository.GetActivatedProjects(org);
            var viewModel = mapper.Map<IEnumerable<ProjectStatus>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/deactivatedlist/")]
        public async Task<ActionResult<IEnumerable<Project>>> GetDeactivatedProjects()
        {
            var response = await projectsRepository.GetDeactivatedProjects();
            var viewModel = mapper.Map<IEnumerable<Project>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/activatedlist/{project}")]
        public async Task<ActionResult<ProjectStatus>> GetActivatedProjectsWhere([FromRoute] string project)
        {
            var response = await projectsRepository.GetActivatedProjectsWhere(project);
            var viewModel = mapper.Map<ProjectStatus>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/years/{project}")]
        public async Task<ActionResult<IEnumerable<Years>>> GetYearsOfProject([FromRoute] string project)
        {
            var response = await projectsRepository.GetYearsOfProject(project);
            var viewModel = mapper.Map<IEnumerable<Years>> (response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/activate/{project}")]
        public async Task<ActionResult<ProjectStatus>> ActivateAProject([FromRoute] string project)
        {
            var response = await projectsRepository.ActivateAProject(project);
            var viewModel = mapper.Map<ProjectStatus>(response);
            return Ok(viewModel);
        }

        [HttpDelete]
        [Route("/deactivate/{project}")]
        public async Task<ActionResult<IEnumerable<ProjectStatus>>> DeactivateAProject([FromRoute] string project)
        {
            var response = await projectsRepository.DeactivateAProject(project);
            var viewModel = mapper.Map<IEnumerable<ProjectStatus>>(response);
            return Ok(viewModel);
        }

        [HttpPatch]
        [Route("/projectstatus/{project}/{year}")]
        public async Task<ActionResult<IEnumerable<ProjectStatus>>> PatchAProject([FromRoute] string project, int year,
            [FromBody] Hour hr)
        {
            var response = await projectsRepository.PatchAProject(project, year, hr);
            var viewModel = mapper.Map<IEnumerable<ProjectStatus>>(response);
            return Ok(viewModel);
        }
        [HttpPatch]
        [Route("/projectstatus/status/{project}/{status}")]
        public async Task<ActionResult<ProjectStatus>> PatchStatus([FromRoute] string project,
            string status)
        {
            var response = await projectsRepository.PatchStatus(project, status);
            var viewModel = mapper.Map<ProjectStatus>(response);
            return Ok(viewModel);
        }
    }
}