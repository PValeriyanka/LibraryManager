namespace LibraryManager.Server.Domain.ModelsDTO
{
    public class BookDTO
    {
        public int BookId { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public int? GenreId { get; set; }
        public int AuthorId { get; set; }
    }
}
