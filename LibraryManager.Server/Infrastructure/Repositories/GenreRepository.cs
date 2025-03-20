using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Infrastructure.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly LibraryContext _context;

        public GenreRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Genre>> GetAllGenres(GenreParameters genreParameters)
        {
            var genresQuery = _context.Genres.AsQueryable();

            var count = await genresQuery.CountAsync();

            var genres = await genresQuery
                .Skip((genreParameters.PageNumber - 1) * genreParameters.PageSize)
                .Take(genreParameters.PageSize)
                .ToListAsync();

            return new PagedList<Genre>(genres, count, genreParameters.PageNumber, genreParameters.PageSize);
        }

        public async Task<IEnumerable<Genre>> GetGenres()
        {
            return await _context.Genres.ToListAsync();
        }

        public async Task<Genre> GetGenreById(int id)
        {
            return await _context.Genres.FirstOrDefaultAsync(g => g.GenreId == id);
        }

        public async Task AddGenre(Genre genre)
        {
            await _context.Genres.AddAsync(genre);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateGenre(Genre genre)
        {
            _context.Genres.Update(genre);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGenre(int id)
        {
            var genre = await GetGenreById(id);
            if (genre != null)
            {
                _context.Genres.Remove(genre);
                await _context.SaveChangesAsync();
            }
        }
    }
}