namespace LibraryManager.Server.ModelsDTO
{
    public class AuthorDTO
    {
        public int AuthorId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Country { get; set; }
    }
}
