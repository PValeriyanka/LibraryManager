using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.ModelsDTO;

namespace LibraryManager.Server.Application.Services
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
