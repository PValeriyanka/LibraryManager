using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using LibraryManager.Server.RequestHelpers;

namespace LibraryManager.Server.Services
{
    public interface IAuthorService
    {
        Task<PagedList<AuthorDTO>> GetAllAuthors(AuthorParameters authorParameters);
        Task<IEnumerable<AuthorDTO>> GetAuthors();
        Task<AuthorDTO> GetAuthorById(int id);
        Task AddAuthor(AuthorDTO authorDTO);
        Task UpdateAuthor(int id, AuthorDTO authorDTO);
        Task DeleteAuthor(int id);
    }
}
