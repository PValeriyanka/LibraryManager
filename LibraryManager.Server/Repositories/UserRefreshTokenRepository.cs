using LibraryManager.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Repositories
{
    public class UserRefreshTokenRepository : IUserRefreshTokenRepository
    {
        private readonly LibraryContext _context;

        public UserRefreshTokenRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task AddRefreshToken(UserRefreshToken userRefreshToken)
        {
            await _context.UserRefreshTokens.AddAsync(userRefreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task<UserRefreshToken> GetRefreshTokenByUserId(int userId)
        {
            return await _context.UserRefreshTokens
                .FirstOrDefaultAsync(r => r.UserId == userId);
        }

        public async Task<UserRefreshToken> GetRefreshTokenByToken(string refreshToken)
        {
            return await _context.UserRefreshTokens
                .FirstOrDefaultAsync(r => r.RefreshToken == refreshToken);
        }

        public async Task DeleteRefreshToken(int id)
        {
            var refreshToken = await _context.UserRefreshTokens.FindAsync(id);
            if (refreshToken != null)
            {
                _context.UserRefreshTokens.Remove(refreshToken);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteRefreshTokenByUserId(int userId)
        {
            var userRefreshTokens = await _context.UserRefreshTokens
                .Where(r => r.UserId == userId)
                .ToListAsync();

            if (userRefreshTokens.Any())
            {
                _context.UserRefreshTokens.RemoveRange(userRefreshTokens);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateRefreshToken(UserRefreshToken userRefreshToken)
        {
            _context.UserRefreshTokens.Update(userRefreshToken);
            await _context.SaveChangesAsync();
        }

        public User GetUserById(int userId)
        {
            return _context.Users.FirstOrDefault(u => u.Id == userId);
        }
    }
}
