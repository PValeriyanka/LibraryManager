using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using LibraryManager.Server.Infrastructure.Repositories;

namespace LibraryManager.Server.Application.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;

        public AuthorService(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        public async Task<PagedList<AuthorDTO>> GetAllAuthors(AuthorParameters authorParameters)
        {
            var pagedAuthors = await _authorRepository.GetAllAuthors(authorParameters);

            var authorsDTO = pagedAuthors.Select(a => new AuthorDTO
            {
                AuthorId = a.AuthorId,
                FirstName = a.FirstName,
                Surname = a.Surname,
                BirthDate = a.BirthDate,
                Country = a.Country
            }).ToList();

            return new PagedList<AuthorDTO>(authorsDTO, pagedAuthors.MetaData.TotalCount, pagedAuthors.MetaData.CurrentPage, pagedAuthors.MetaData.PageSize);
        }

        public async Task<IEnumerable<AuthorDTO>> GetAuthors()
        {
            var authors = await _authorRepository.GetAuthors();

            var authorsDTO = authors.Select(a => new AuthorDTO
            {
                AuthorId = a.AuthorId,
                FirstName = a.FirstName,
                Surname = a.Surname,
                BirthDate = a.BirthDate,
                Country = a.Country
            }).ToList();

            return authorsDTO;
        }


        public async Task<AuthorDTO> GetAuthorById(int id)
        {
            var author = await _authorRepository.GetAuthorById(id);

            if (author == null)
            {
                return null;
            }

            return new AuthorDTO
            {
                AuthorId = author.AuthorId,
                FirstName = author.FirstName,
                Surname = author.Surname,
                BirthDate = author.BirthDate,
                Country = author.Country
            };
        }

        public async Task AddAuthor(AuthorDTO authorDTO)
        {
            Author author = new Author();

            author.AuthorId = authorDTO.AuthorId;
            author.FirstName = authorDTO.FirstName;
            author.Surname = authorDTO.Surname;
            author.BirthDate = authorDTO.BirthDate;
            author.Country = authorDTO.Country;

            await _authorRepository.AddAuthor(author);
        }

        public async Task UpdateAuthor(int id, AuthorDTO authorDTO)
        {
            var author = await _authorRepository.GetAuthorById(id);

            author.FirstName = authorDTO.FirstName;
            author.Surname = authorDTO.Surname;
            author.BirthDate = authorDTO.BirthDate;
            author.Country = authorDTO.Country;

            await _authorRepository.UpdateAuthor(author);
        }

        public async Task DeleteAuthor(int id)
        {
            await _authorRepository.DeleteAuthor(id);
        }
    }
}
