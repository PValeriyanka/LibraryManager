using Microsoft.AspNetCore.Mvc;
using LibraryManager.Server.Services;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using LibraryManager.Server.ModelsDTO;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.Models;

namespace LibraryManager.Server.Controllers
{
    [ApiController]
    [Route("api/borrowedBooks")]
    public class BorrowedBooksController : ControllerBase
    {
        private readonly IBorrowedBookService _borrowedBookService;
        private readonly IUserService _userService;

        public BorrowedBooksController(IBorrowedBookService borrowedBookService, IUserService userService)
        {
            _borrowedBookService = borrowedBookService;
            _userService = userService;
        }

        // GET: api/borrowedBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BorrowedBookDTO>>> GetAllBorrowedBooks([FromQuery] BorrowedBookParameters borrowedBookParameters, [FromQuery] string email)
        {
            var userDTO = await _userService.GetUserByEmail(email);

            var borrowedBooks = await _borrowedBookService.GetAllBorrowedBooks(borrowedBookParameters, userDTO.UserId);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(borrowedBooks.MetaData));

            return Ok(borrowedBooks);
        }

        // GET: api/borrowedBooks/withoutmeta
        [HttpGet("withoutmeta")]
        public async Task<IActionResult> GetBorrowedBooks([FromQuery] BorrowedBookParameters borrowedBookParameters)
        {
            var borrowedBooks = await _borrowedBookService.GetBorrowedBooks();

            return Ok(borrowedBooks);
        }

        // GET: api/borrowedBooks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BorrowedBookDTO>> GetBorrowedBookById(int id)
        {
            var borrowedBook = await _borrowedBookService.GetBorrowedBookById(id);

            if (borrowedBook == null)
            {
                return NotFound();
            }

            return Ok(borrowedBook);
        }

        // POST: api/borrowedBooks
        [HttpPost]
        public async Task<ActionResult<BorrowedBook>> AddBorrowedBook([FromBody] BorrowedBookDTO borrowedBookDTO, [FromQuery] string email)
        {
            var userDTO = await _userService.GetUserByEmail(email);

            borrowedBookDTO.UserId = userDTO.UserId;
            Console.WriteLine("!!", borrowedBookDTO.UserId);

            await _borrowedBookService.AddBorrowedBook(borrowedBookDTO);

            return CreatedAtAction(nameof(GetBorrowedBookById), new { id = borrowedBookDTO.BorrowId }, borrowedBookDTO);
        }

        // DELETE: api/borrowedBooks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBorrowedBook(int id)
        {
            var existingBorrowedBook = await _borrowedBookService.GetBorrowedBookById(id);
            if (existingBorrowedBook == null)
            {
                return NotFound();
            }

            await _borrowedBookService.DeleteBorrowedBook(id);

            return NoContent();
        }
    }
}