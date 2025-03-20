namespace LibraryManager.Server.Domain.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public int? GenreId { get; set; }
        public int AuthorId { get; set; }

        public Author Author { get; set; }
        public Genre Genre { get; set; }
    }
}
