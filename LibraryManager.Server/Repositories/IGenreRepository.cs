using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;

namespace LibraryManager.Server.Repositories
{
    public interface IGenreRepository
    {
        Task<PagedList<Genre>> GetAllGenres(GenreParameters genreParameters);
        Task<IEnumerable<Genre>> GetGenres();
        Task<Genre> GetGenreById(int id);
        Task AddGenre(Genre genre);
        Task UpdateGenre(Genre genre);
        Task DeleteGenre(int id);
    }
}