using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Infrastructure.Repositories
{
    public interface IUserRefreshTokenRepository
    {
        Task AddRefreshToken(UserRefreshToken userRefreshToken);
        Task<UserRefreshToken> GetRefreshTokenByUserId(int userId);
        Task<UserRefreshToken> GetRefreshTokenByToken(string refreshToken);
        Task DeleteRefreshToken(int id);
        Task DeleteRefreshTokenByUserId(int userId);
        Task UpdateRefreshToken(UserRefreshToken userRefreshToken);
        User GetUserById(int userId);
    }
}
