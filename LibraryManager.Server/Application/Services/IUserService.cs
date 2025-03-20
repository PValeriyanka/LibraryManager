using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.ModelsDTO;

namespace LibraryManager.Server.Application.Services
{
    public interface IUserService
    {
        Task<PagedList<UserDTO>> GetAllUsers(UserParameters userParameters);
        Task<IEnumerable<UserDTO>> GetUsers();
        Task<UserDTO> GetUserById(int id);
        Task<UserDTO> GetUserByEmail(string email);
        Task AddUser(UserDTO userDTO);
        Task UpdateUser(int id, UserDTO userDTO);
        Task DeleteUser(int id);
    }
}
