using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Infrastructure.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly LibraryContext _context;

        public AuthorRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Author>> GetAllAuthors(AuthorParameters authorParameters)
        {
            var authorsQuery = _context.Authors.AsQueryable();

            if (!string.IsNullOrWhiteSpace(authorParameters.searchById) && int.TryParse(authorParameters.searchById, out int authorId))
            {
                authorsQuery = authorsQuery.Where(a => a.AuthorId == authorId);
            }

            var count = await authorsQuery.CountAsync();

            var authors = await authorsQuery
                .Skip((authorParameters.PageNumber - 1) * authorParameters.PageSize)
                .Take(authorParameters.PageSize)
                .ToListAsync();

            return new PagedList<Author>(authors, count, authorParameters.PageNumber, authorParameters.PageSize);
        }

        public async Task<IEnumerable<Author>> GetAuthors()
        {
            return await _context.Authors.ToListAsync();
        }

        public async Task<Author> GetAuthorById(int id)
        {
            return await _context.Authors.FirstOrDefaultAsync(a => a.AuthorId == id);
        }

        public async Task AddAuthor(Author author)
        {
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAuthor(Author author)
        {
            _context.Authors.Update(author);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAuthor(int id)
        {
            var author = await GetAuthorById(id);
            if (author != null)
            {
                _context.Authors.Remove(author);
                await _context.SaveChangesAsync();
            }
        }
    }
}