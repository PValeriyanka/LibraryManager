namespace LibraryManager.Server.Application.RequestHelpers.ModelParameters
{
    public class BookParameters : RequestParameters
    {
        public string? searchById { get; set; }
        public string? searchByISBN { get; set; }
        public string? searchByTitle { get; set; }
        public int? searchByGenre { get; set; }
        public int? searchByAuthor { get; set; }
    }
}
