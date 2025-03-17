using LibraryManager.Server.Models;
using Microsoft.AspNetCore.Mvc;
using LibraryManager.Server.Services;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using LibraryManager.Server.ModelsDTO;
using System.Text.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace LibraryManager.Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UsersController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers([FromQuery] UserParameters userParameters)
        {
            var users = await _userService.GetAllUsers(userParameters);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(users.MetaData));

            return Ok(users);
        }

        // GET: api/users/withoutmeta
        [HttpGet("withoutmeta")]
        public async Task<IActionResult> GetUsers([FromQuery] UserParameters userParameters)
        {
            var users = await _userService.GetUsers();

            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDTO userDTO)
        {
            await _userService.UpdateUser(id, userDTO);

            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = await _userService.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            await _userService.DeleteUser(id);

            return NoContent();
        }
    }
}