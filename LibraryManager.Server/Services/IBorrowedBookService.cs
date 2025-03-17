using LibraryManager.Server.Models;
using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using LibraryManager.Server.RequestHelpers;

namespace LibraryManager.Server.Services
{
    public interface IBorrowedBookService
    {
        Task<PagedList<BorrowedBookDTO>> GetAllBorrowedBooks(BorrowedBookParameters borrowedBookParameters, int id);
        Task<IEnumerable<BorrowedBookDTO>> GetBorrowedBooks(); 
        Task<BorrowedBookDTO> GetBorrowedBookById(int id);
        Task AddBorrowedBook(BorrowedBookDTO borrowedBookDTO);
        Task UpdateBorrowedBook(int id, BorrowedBookDTO borrowedBookDTO);
        Task DeleteBorrowedBook(int id);
    }
}
