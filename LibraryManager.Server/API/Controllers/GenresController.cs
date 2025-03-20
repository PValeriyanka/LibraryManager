using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Application.Services;
using LibraryManager.Server.Domain.Models;
using LibraryManager.Server.Domain.ModelsDTO;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace LibraryManager.Server.API.Controllers
{
    [ApiController]
    [Route("api/genres")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        // GET: api/genres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreDTO>>> GetAllGenres([FromQuery] GenreParameters genreParameters)
        {
            var genres = await _genreService.GetAllGenres(genreParameters);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(genres.MetaData));

            return Ok(genres);
        }

        // GET: api/genres/withoutmeta
        [HttpGet("withoutmeta")]
        public async Task<IActionResult> GetGenres([FromQuery] GenreParameters genreParameters)
        {
            var genres = await _genreService.GetGenres();

            return Ok(genres);
        }

        // GET: api/genres/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDTO>> GetGenreById(int id)
        {
            var genre = await _genreService.GetGenreById(id);

            if (genre == null)
            {
                return NotFound();
            }

            return Ok(genre);
        }

        // POST: api/genres
        [HttpPost]
        public async Task<ActionResult<Genre>> AddGenre([FromBody] GenreDTO genreDTO)
        {
            await _genreService.AddGenre(genreDTO);

            return CreatedAtAction(nameof(GetGenreById), new { id = genreDTO.GenreId }, genreDTO);
        }

        // PUT: api/genres/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(int id, [FromBody] GenreDTO genreDTO)
        {
            await _genreService.UpdateGenre(id, genreDTO);

            return NoContent();
        }

        // DELETE: api/genres/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var existingGenre = await _genreService.GetGenreById(id);
            if (existingGenre == null)
            {
                return NotFound();
            }

            await _genreService.DeleteGenre(id);

            return NoContent();
        }
    }
}