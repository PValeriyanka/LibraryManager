using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Infrastructure.Repositories
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