using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.ModelsDTO;

namespace LibraryManager.Server.Application.Services
{
    public interface IGenreService
    {
        Task<PagedList<GenreDTO>> GetAllGenres(GenreParameters genreParameters);
        Task<IEnumerable<GenreDTO>> GetGenres();
        Task<GenreDTO> GetGenreById(int id);
        Task AddGenre(GenreDTO genreDTO);
        Task UpdateGenre(int id, GenreDTO genreDTO);
        Task DeleteGenre(int id);
    }
}
