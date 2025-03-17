using LibraryManager.Server.Models;
using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;

namespace LibraryManager.Server.Services
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
