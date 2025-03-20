using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using LibraryManager.Server.Infrastructure.Repositories;

namespace LibraryManager.Server.Application.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;

        public GenreService(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        public async Task<PagedList<GenreDTO>> GetAllGenres(GenreParameters genreParameters)
        {
            var pagedGenres = await _genreRepository.GetAllGenres(genreParameters);

            var genresDTO = pagedGenres.Select(g => new GenreDTO
            {
                GenreId = g.GenreId,
                GenreName = g.GenreName,
                GenreDescription = g.GenreDescription
            }).ToList();

            return new PagedList<GenreDTO>(genresDTO, pagedGenres.MetaData.TotalCount, pagedGenres.MetaData.CurrentPage, pagedGenres.MetaData.PageSize);
        }

        public async Task<IEnumerable<GenreDTO>> GetGenres()
        {
            var genres = await _genreRepository.GetGenres();

            var genresDTO = genres.Select(g => new GenreDTO
            {
                GenreId = g.GenreId,
                GenreName = g.GenreName,
                GenreDescription = g.GenreDescription
            }).ToList();

            return genresDTO;
        }

        public async Task<GenreDTO> GetGenreById(int id)
        {
            var genre = await _genreRepository.GetGenreById(id);

            if (genre == null)
            {
                return null;
            }

            return new GenreDTO
            {
                GenreId = genre.GenreId,
                GenreName = genre.GenreName,
                GenreDescription = genre.GenreDescription
            };
        }

        public async Task AddGenre(GenreDTO genreDTO)
        {
            Genre genre = new Genre();

            genre.GenreId = genreDTO.GenreId;
            genre.GenreName = genreDTO.GenreName;
            genre.GenreDescription = genreDTO.GenreDescription;

            await _genreRepository.AddGenre(genre);
        }

        public async Task UpdateGenre(int id, GenreDTO genreDTO)
        {
            var genre = await _genreRepository.GetGenreById(id);

            if (genre == null)
            {
                throw new Exception("Book not found.");
            }

            genre.GenreId = genreDTO.GenreId;
            genre.GenreName = genreDTO.GenreName;
            genre.GenreDescription = genreDTO.GenreDescription;

            await _genreRepository.UpdateGenre(genre);
        }

        public async Task DeleteGenre(int id)
        {
            await _genreRepository.DeleteGenre(id);
        }
    }
}