using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Infrastructure.Repositories
{
    public interface IUserRepository
    {
        Task<PagedList<User>> GetAllUsers(UserParameters userParameters);
        Task<IEnumerable<User>> GetUsers();
        IQueryable<User> GetUsersQuery();
        Task<User> GetUserById(int id);
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int id);
    }
}