using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Application.Services;
using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace LibraryManager.Server.API.Controllers
{
    [ApiController]
    [Route("api/authors")]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        // GET: api/authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorDTO>>> GetAllAuthors([FromQuery] AuthorParameters authorParameters)
        {
            var authors = await _authorService.GetAllAuthors(authorParameters);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(authors.MetaData));

            return Ok(authors);
        }

        // GET: api/authors/withoutmeta
        [HttpGet("withoutmeta")]
        public async Task<IActionResult> GetAuthors([FromQuery] AuthorParameters authorParameters)
        {
            var authors = await _authorService.GetAuthors();

            return Ok(authors);
        }

        // GET: api/authors/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorDTO>> GetAuthorById(int id)
        {
            var author = await _authorService.GetAuthorById(id);

            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }

        // POST: api/authors
        [HttpPost]
        public async Task<ActionResult<Author>> AddAuthor([FromBody] AuthorDTO authorDTO)
        {
            await _authorService.AddAuthor(authorDTO);

            return CreatedAtAction(nameof(GetAuthorById), new { id = authorDTO.AuthorId }, authorDTO);
        }

        // PUT: api/authors/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] AuthorDTO authorDTO)
        {
            await _authorService.UpdateAuthor(id, authorDTO);

            return NoContent();
        }

        // DELETE: api/authors/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var existingAuthor = await _authorService.GetAuthorById(id);
            if (existingAuthor == null)
            {
                return NotFound();
            }

            await _authorService.DeleteAuthor(id);

            return NoContent();
        }
    }
}