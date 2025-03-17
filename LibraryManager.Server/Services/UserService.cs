using LibraryManager.Server.Models;
using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.Repositories;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace LibraryManager.Server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<PagedList<UserDTO>> GetAllUsers(UserParameters userParameters)
        {
            var pagedUsers = await _userRepository.GetAllUsers(userParameters);

            var usersDTO = pagedUsers.Select(u => new UserDTO
            {
                UserId = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                PasswordHash = u.PasswordHash,
                Role = u.Role
            }).ToList();

            return new PagedList<UserDTO>(usersDTO, pagedUsers.MetaData.TotalCount, pagedUsers.MetaData.CurrentPage, pagedUsers.MetaData.PageSize);
        }

        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            var users = await _userRepository.GetUsers();

            var usersDTO = users.Select(u => new UserDTO
            {
                UserId = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                PasswordHash = u.PasswordHash,
                Role = u.Role
            }).ToList();

            return usersDTO;
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUsersQuery().FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return null;
            }

            return new UserDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                Role = user.Role
            };
        }

        public async Task<UserDTO> GetUserById(int id)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
            {
                return null;
            }

            return new UserDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                Role = user.Role
            };
        }

        public async Task AddUser(UserDTO userDTO)
        {
            User user = new User
            {
                Id = userDTO.UserId,
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                PasswordHash = userDTO.PasswordHash,
                Role = userDTO.Role
            };

            await _userRepository.AddUser(user);
        }

        public async Task UpdateUser(int id, UserDTO userDTO)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
            {
                throw new Exception("Book not found.");
            }

            user.UserName = userDTO.UserName;
            user.Email = userDTO.Email;
            user.PasswordHash = userDTO.PasswordHash;
            user.Role = userDTO.Role;

            await _userRepository.UpdateUser(user);
        }

        public async Task DeleteUser(int id)
        {
            await _userRepository.DeleteUser(id);
        }
    }
}