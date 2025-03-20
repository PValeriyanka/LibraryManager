namespace LibraryManager.Server.Domain.Models
{
    public class BorrowedBook
    {
        public int BorrowId { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateOnly BorrowedDate { get; set; }
        public DateOnly DueDate { get; set; }

        public Book Book { get; set; }
        public User User { get; set; }
    }
}
