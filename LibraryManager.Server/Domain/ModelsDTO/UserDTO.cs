using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Domain.ModelsDTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public UserRole Role { get; set; }
    }
}
