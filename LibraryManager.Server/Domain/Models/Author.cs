namespace LibraryManager.Server.Domain.Models
{
    public class Author
    {
        public int AuthorId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Country { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
