using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Infrastructure.Repositories
{
    public class BorrowedBookRepository : IBorrowedBookRepository
    {
        private readonly LibraryContext _context;

        public BorrowedBookRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<PagedList<BorrowedBook>> GetAllBorrowedBooks(BorrowedBookParameters borrowedBookParameters, int id)
        {
            var borrowedBooksQuery = _context.BorrowedBooks.Include(bb => bb.Book).Include(bb => bb.User).AsQueryable();

            if (id != -1)
                borrowedBooksQuery = borrowedBooksQuery.Where(bb => bb.UserId == id).AsQueryable();


            var count = await borrowedBooksQuery.CountAsync();

            var borrowedBooks = await borrowedBooksQuery
                .Skip((borrowedBookParameters.PageNumber - 1) * borrowedBookParameters.PageSize)
                .Take(borrowedBookParameters.PageSize)
                .ToListAsync();

            return new PagedList<BorrowedBook>(borrowedBooks, count, borrowedBookParameters.PageNumber, borrowedBookParameters.PageSize);
        }

        public async Task<IEnumerable<BorrowedBook>> GetBorrowedBooks()
        {
            return await _context.BorrowedBooks.ToListAsync();
        }

        public async Task<BorrowedBook> GetBorrowedBookById(int id)
        {
            return await _context.BorrowedBooks.Include(bb => bb.Book).Include(bb => bb.User)
                .FirstOrDefaultAsync(bb => bb.BorrowId == id);
        }

        public async Task AddBorrowedBook(BorrowedBook borrowedBook)
        {
            await _context.BorrowedBooks.AddAsync(borrowedBook);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBorrowedBook(BorrowedBook borrowedBook)
        {
            _context.BorrowedBooks.Update(borrowedBook);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBorrowedBook(int id)
        {
            var borrowedBook = await GetBorrowedBookById(id);
            if (borrowedBook != null)
            {
                _context.BorrowedBooks.Remove(borrowedBook);
                await _context.SaveChangesAsync();
            }
        }
    }
}