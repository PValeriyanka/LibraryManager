using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;

namespace LibraryManager.Server.Models
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
