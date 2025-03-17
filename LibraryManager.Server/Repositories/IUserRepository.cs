using LibraryManager.Server.Models;
using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;

namespace LibraryManager.Server.Repositories
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