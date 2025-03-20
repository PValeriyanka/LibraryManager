using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.ModelsDTO;

namespace LibraryManager.Server.Application.Services
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
