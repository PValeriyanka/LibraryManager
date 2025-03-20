using Microsoft.AspNetCore.Identity;

namespace LibraryManager.Server.Domain.Models
{
    public class User : IdentityUser<int>
    {
        public UserRole Role { get; set; }
    }

    public enum UserRole
    {
        User,
        Administrator
    }
}
