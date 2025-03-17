using LibraryManager.Server.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.Models;

namespace LibraryManager.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserRefreshTokenRepository _refreshTokenRepository;
        private readonly IConfiguration _configuration;

        public TokenService(IUserRefreshTokenRepository refreshTokenRepository, IConfiguration configuration)
        {
            _refreshTokenRepository = refreshTokenRepository;
            _configuration = configuration;
        }

        public async Task<string> GenerateAccessToken(UserDTO userDTO)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userDTO.UserId.ToString()),
                new Claim(ClaimTypes.Name, userDTO.UserName),
                new Claim(ClaimTypes.Role, userDTO.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:AccessTokenExpiration"]));

            try
            {
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: expiration,
                    signingCredentials: credentials
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new Exception("Error generating access token", ex);
            }
        }

        public async Task<string> GenerateRefreshToken(UserDTO userDTO)
        {
            var refreshToken = new UserRefreshToken
            {
                RefreshToken = Guid.NewGuid().ToString(),
                ExpirationDate = DateTime.UtcNow.AddDays(30), 
                UserId = userDTO.UserId,
                User = _refreshTokenRepository.GetUserById(userDTO.UserId)
            };

            await _refreshTokenRepository.AddRefreshToken(refreshToken);
            return refreshToken.RefreshToken;
        }

        public async Task<ClaimsPrincipal> ValidateAccessToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true
                }, out var validatedToken);

                return principal;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> ValidateRefreshToken(string token)
        {
            var refreshToken = await _refreshTokenRepository.GetRefreshTokenByToken(token);
            return refreshToken != null && refreshToken.ExpirationDate > DateTime.UtcNow;
        }

        public async Task<string> RefreshAccessToken(string refreshToken)
        {
            var existingRefreshToken = await _refreshTokenRepository.GetRefreshTokenByToken(refreshToken);

            if (existingRefreshToken == null || existingRefreshToken.ExpirationDate <= DateTime.UtcNow)
            {
                return null;
            }

            var user = _refreshTokenRepository.GetUserById(existingRefreshToken.UserId);

            if (user == null)
            {
                return null; 
            }

            var userDTO = new UserDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                Role = user.Role
            };

            return await GenerateAccessToken(userDTO);
        }

        public async Task DeleteRefreshToken(string refreshToken)
        {
            var existingRefreshToken = await _refreshTokenRepository.GetRefreshTokenByToken(refreshToken);

            if (existingRefreshToken != null)
            {
                await _refreshTokenRepository.DeleteRefreshToken(existingRefreshToken.Id);
            }
        }

        public async Task AddRefreshToken(UserRefreshToken userRefreshToken)
        {
            await _refreshTokenRepository.AddRefreshToken(userRefreshToken);
        }
    }
}
