namespace LibraryManager.Server.Models
{
    public class UserRefreshToken
    {
        public int Id { get; set; } 
        public string RefreshToken { get; set; } 
        public DateTime ExpirationDate { get; set; } 
        public int UserId { get; set; } 
        public User User { get; set; } 
    }
}
