using Microsoft.AspNetCore.Mvc;
using LibraryManager.Server.Services;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using LibraryManager.Server.ModelsDTO;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System;
using LibraryManager.Server.Models;

namespace LibraryManager.Server.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: api/books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetAllBooks([FromQuery] BookParameters bookParameters)
        {
            var books = await _bookService.GetAllBooks(bookParameters);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(books.MetaData));

            return Ok(books);
        }

        // GET: api/books/withoutmeta
        [HttpGet("withoutmeta")]
        public async Task<IActionResult> GetBooks([FromQuery] BookParameters bookParameters)
        {
            var books = await _bookService.GetBooks();

            return Ok(books);
        }

        // GET: api/books/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BookDTO>> GetBookById(int id)
        {
            var book = await _bookService.GetBookById(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<Book>> AddBook([FromBody] BookDTO bookDTO)
        {
            await _bookService.AddBook(bookDTO);

            return CreatedAtAction(nameof(GetBookById), new { id = bookDTO.BookId }, bookDTO);
        }

        // PUT: api/books/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDTO book)
        {
            await _bookService.UpdateBook(id, book);

            return NoContent();
        }

        // DELETE: api/books/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            await _bookService.DeleteBook(id);

            return NoContent();
        }
    }
}