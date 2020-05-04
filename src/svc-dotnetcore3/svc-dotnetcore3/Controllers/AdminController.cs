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
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository adminRepository;
        private readonly IMapper mapper;

        public AdminController(IAdminRepository adminRepository, IMapper mapper)
        {
            this.adminRepository = adminRepository;
            this.mapper = mapper;
        }

        /*[HttpGet]
        [Route("/adminlogin")]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAllAdmins()
        {
            var response = await adminRepository.GetAllAdmins();
            var viewModel = mapper.Map<IEnumerable<Admin>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/adminlogin/{username}")]
        public async Task<ActionResult<Admin>> GetAAdmin(string username)
        {
            var response = await adminRepository.GetAAdmin(username);
            var viewModel = mapper.Map<Admin>(response);
            return Ok(viewModel);
        }*/

        [HttpGet]
        [Route("/adminlogin/{username}/{password}")]
        public async Task<ActionResult<Admin>> CheckAAdmin(string username, string password)
        {
            var response = await adminRepository.CheckAAdmin(username, password);
            var viewModel = mapper.Map<Admin>(response);
            return Ok(viewModel);
        }

        [HttpDelete]
        [Route("/adminlogin/{username}")]
        public async Task<ActionResult<Admin>> DeleteAAdmin([FromRoute] string username)
        {
            var response = await adminRepository.DeleteAAdmin(username);
            var viewModel = mapper.Map<Admin>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/adminlogin")]
        public async Task<ActionResult<Admin>> CreateAAdmin([FromBody] Admin admin)
        {
            var response = await adminRepository.CreateAAdmin(admin);
            var viewModel = mapper.Map<Admin>(response);
            return Created("GetAAdmin", viewModel);
        }
        [HttpPatch]
        [Route("/adminlogin/{password}")]
        public async Task<ActionResult<Admin>> UpdateAAdmin([FromRoute] string password, [FromBody] Admin admin)
        {
            var response = await adminRepository.UpdateAAdmin(password, admin);
            var viewModel = mapper.Map<Admin>(response);
            return Accepted(viewModel);
        }
    }
}