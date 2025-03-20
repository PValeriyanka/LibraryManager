namespace LibraryManager.Server.Domain.ModelsDTO
{
    public class BorrowedBookDTO
    {
        public int BorrowId { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateOnly BorrowedDate { get; set; }
        public DateOnly DueDate { get; set; }
    }
}
