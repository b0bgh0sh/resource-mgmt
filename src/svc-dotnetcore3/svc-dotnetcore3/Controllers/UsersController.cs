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
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository usersRepository;
        private readonly IMapper mapper;

        public UsersController(IUsersRepository usersRepository, IMapper mapper)
        {
            this.usersRepository = usersRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("/users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var response = await usersRepository.GetAllUsers();
            var viewModel = mapper.Map<IEnumerable<User>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/users/org/{organization}")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsersWhere([FromRoute]string organization)
        {
            var response = await usersRepository.GetAllUsersWhere(organization);
            var viewModel = mapper.Map<IEnumerable<User>>(response);
            return Ok(viewModel);
        }
        [HttpGet]
        [Route("/managers/{organization}")]
        public async Task<ActionResult<IEnumerable<Uname>>> GetManagers([FromRoute] string organization)
        {
            var response = await usersRepository.GetManagers(organization);
            var viewModel = mapper.Map<IEnumerable<Uname>>(response);
            return Ok(viewModel);
        }

        [HttpGet]
        [Route("/users/{username}")]
        public async Task<ActionResult<User>> GetAUser([FromRoute]string username)
        {
            var response = await usersRepository.GetAUser(username);
            var viewModel = mapper.Map<User>(response);
            return Ok(viewModel);
        }

        [HttpDelete]
        [Route("/users/{username}")]
        public async Task<ActionResult<User>> DeleteAUser([FromRoute] string username)
        {
            var response = await usersRepository.DeleteAUser(username);
            var viewModel = mapper.Map<User>(response);
            return Ok(viewModel);
        }

        [HttpPost]
        [Route("/users")]
        public async Task<ActionResult<User>> CreateAUser([FromBody] User user)
        {
            var response = await usersRepository.CreateAUser(user);
            var viewModel = mapper.Map<User>(response);
            return Created("GetAUser", viewModel);
        }

        [HttpPatch]
        [Route("/users")]
        public async Task<ActionResult<User>> UpdateAUser([FromBody] User user)
        {
            var response = await usersRepository.UpdateAUser(user);
            var viewModel = mapper.Map<User>(response);
            return Accepted("GetAUser", viewModel);
        }
    }
}
