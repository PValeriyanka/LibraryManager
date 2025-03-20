using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using LibraryManager.Server.Infrastructure.Repositories;

namespace LibraryManager.Server.Application.Services
{
    public class BorrowedBookService : IBorrowedBookService
    {
        private readonly IBorrowedBookRepository _borrowedBookRepository;

        public BorrowedBookService(IBorrowedBookRepository borrowedBookRepository)
        {
            _borrowedBookRepository = borrowedBookRepository;
        }

        public async Task<PagedList<BorrowedBookDTO>> GetAllBorrowedBooks(BorrowedBookParameters borrowedBookParameters, int id)
        {
            var pagedBorrowedBooks = await _borrowedBookRepository.GetAllBorrowedBooks(borrowedBookParameters, id);

            var borrowedBooksDTO = pagedBorrowedBooks.Select(bb => new BorrowedBookDTO
            {
                BorrowId = bb.BorrowId,
                BookId = bb.BookId,
                UserId = bb.UserId,
                BorrowedDate = bb.BorrowedDate,
                DueDate = bb.DueDate
            }).ToList();

            return new PagedList<BorrowedBookDTO>(borrowedBooksDTO, pagedBorrowedBooks.MetaData.TotalCount, pagedBorrowedBooks.MetaData.CurrentPage, pagedBorrowedBooks.MetaData.PageSize);
        }

        public async Task<IEnumerable<BorrowedBookDTO>> GetBorrowedBooks()
        {
            var borrowedBooks = await _borrowedBookRepository.GetBorrowedBooks();

            var borrowedBooksDTO = borrowedBooks.Select(bb => new BorrowedBookDTO
            {
                BorrowId = bb.BorrowId,
                BookId = bb.BookId,
                UserId = bb.UserId,
                BorrowedDate = bb.BorrowedDate,
                DueDate = bb.DueDate
            }).ToList();

            return borrowedBooksDTO;
        }

        public async Task<BorrowedBookDTO> GetBorrowedBookById(int id)
        {
            var borrowedBook = await _borrowedBookRepository.GetBorrowedBookById(id);

            if (borrowedBook == null)
            {
                return null;
            }

            return new BorrowedBookDTO
            {
                BorrowId = borrowedBook.BorrowId,
                BookId = borrowedBook.BookId,
                UserId = borrowedBook.UserId,
                BorrowedDate = borrowedBook.BorrowedDate,
                DueDate = borrowedBook.DueDate
            };
        }

        public async Task AddBorrowedBook(BorrowedBookDTO borrowedBookDTO)
        {
            BorrowedBook borrowedBook = new BorrowedBook();

            borrowedBook.BorrowId = borrowedBookDTO.BorrowId;
            borrowedBook.BookId = borrowedBookDTO.BookId;
            borrowedBook.UserId = borrowedBookDTO.UserId;
            borrowedBook.BorrowedDate = borrowedBookDTO.BorrowedDate;
            borrowedBook.DueDate = borrowedBookDTO.DueDate;

            await _borrowedBookRepository.AddBorrowedBook(borrowedBook);
        }

        public async Task UpdateBorrowedBook(int id, BorrowedBookDTO borrowedBookDTO)
        {
            var borrowedBook = await _borrowedBookRepository.GetBorrowedBookById(id);

            borrowedBook.BookId = borrowedBookDTO.BookId;
            borrowedBook.UserId = borrowedBookDTO.UserId;
            borrowedBook.BorrowedDate = borrowedBookDTO.BorrowedDate;
            borrowedBook.DueDate = borrowedBookDTO.DueDate;

            await _borrowedBookRepository.UpdateBorrowedBook(borrowedBook);
        }

        public async Task DeleteBorrowedBook(int id)
        {
            await _borrowedBookRepository.DeleteBorrowedBook(id);
        }
    }
}