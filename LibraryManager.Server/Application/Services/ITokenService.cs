using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using System.Security.Claims;

namespace LibraryManager.Server.Application.Services
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(UserDTO userDTO);

        Task<string> GenerateRefreshToken(UserDTO userDTO);

        Task<ClaimsPrincipal> ValidateAccessToken(string token);

        Task<bool> ValidateRefreshToken(string token);

        Task<string> RefreshAccessToken(string refreshToken);

        Task DeleteRefreshToken(string refreshToken);

        Task AddRefreshToken(UserRefreshToken userRefreshToken);
    }
}
