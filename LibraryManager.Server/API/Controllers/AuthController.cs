using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.Services;
using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManager.Server.API.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthController(ITokenService tokenService, IUserService userService, IPasswordHasher<User> passwordHasher)
        {
            _tokenService = tokenService;
            _userService = userService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var userDTO = await _userService.GetUserByEmail(loginRequest.Email);

            if (userDTO == null)
            {
                return Unauthorized("Invalid credentials");
            }

            var userForVerification = new User
            {
                PasswordHash = userDTO.PasswordHash
            };

            var passwordHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passwordHasher.VerifyHashedPassword(userForVerification, userDTO.PasswordHash, loginRequest.Password);

            if (passwordVerificationResult != PasswordVerificationResult.Success)
            {
                return Unauthorized("Invalid credentials");
            }

            var accessToken = await _tokenService.GenerateAccessToken(userDTO);
            var refreshToken = await _tokenService.GenerateRefreshToken(userDTO);

            await _tokenService.AddRefreshToken(new UserRefreshToken
            {
                UserId = userDTO.UserId,
                RefreshToken = refreshToken,
                ExpirationDate = DateTime.UtcNow.AddDays(30)
            });

            return Ok(new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Application.RequestHelpers.RegisterRequest registerRequest)
        {
            var existingUser = await _userService.GetUserByEmail(registerRequest.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            var passwordHash = _passwordHasher.HashPassword(null, registerRequest.Password);

            var userDTO = new UserDTO
            {
                UserName = registerRequest.UserName,
                Email = registerRequest.Email,
                PasswordHash = passwordHash,
                Role = UserRole.User
            };

            await _userService.AddUser(userDTO);

            return CreatedAtAction(nameof(Login), new { email = userDTO.Email }, new
            {
                Message = "User registered successfully",
                User = userDTO
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest refreshTokenRequest)
        {
            var newAccessToken = await _tokenService.RefreshAccessToken(refreshTokenRequest.RefreshToken);

            if (newAccessToken == null)
            {
                return Unauthorized("Invalid or expired refresh token");
            }

            return Ok(new { AccessToken = newAccessToken });
        }
    }


    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
