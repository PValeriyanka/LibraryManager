using LibraryManager.Server.Models;
using LibraryManager.Server.ModelsDTO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LibraryManager.Server.Services
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
