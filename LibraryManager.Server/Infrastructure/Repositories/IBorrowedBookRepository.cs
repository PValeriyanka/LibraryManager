using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Infrastructure.Repositories
{
    public interface IBorrowedBookRepository
    {
        Task<PagedList<BorrowedBook>> GetAllBorrowedBooks(BorrowedBookParameters borrowedBookParameters, int id);
        Task<IEnumerable<BorrowedBook>> GetBorrowedBooks();
        Task<BorrowedBook> GetBorrowedBookById(int id);
        Task AddBorrowedBook(BorrowedBook borrowedBook);
        Task UpdateBorrowedBook(BorrowedBook borrowedBook);
        Task DeleteBorrowedBook(int id);
    }
}