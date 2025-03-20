using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Infrastructure.Repositories
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