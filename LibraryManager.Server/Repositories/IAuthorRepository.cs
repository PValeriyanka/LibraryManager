using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;

namespace LibraryManager.Server.Repositories
{
    public interface IAuthorRepository
    {
        Task<PagedList<Author>> GetAllAuthors(AuthorParameters authorParameters);
        Task<IEnumerable<Author>> GetAuthors();
        Task<Author> GetAuthorById(int id);
        Task AddAuthor(Author author);
        Task UpdateAuthor(Author author);
        Task DeleteAuthor(int id);
    }
}