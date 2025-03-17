using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;

namespace LibraryManager.Server.Repositories
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