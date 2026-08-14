using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZaalvoetbalService.Data;
using ZaalvoetbalService.Models;

namespace ZaalvoetbalService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpelersController : ControllerBase
    {
        private readonly AppDbContext _appdbContext;
        public SpelersController (AppDbContext appdbContext)
        {
            _appdbContext = appdbContext;
        }
        [HttpPost]
        public async Task<ActionResult<Speler>> AddSpeler(Speler speler)
        {
            _appdbContext.Spelers.Add(speler);
            await _appdbContext.SaveChangesAsync();
            return Ok(speler);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSpeler(int id)
        {
            var speler = await _appdbContext.Spelers.FindAsync(id);
            if (speler ==  null) return NotFound();
            _appdbContext.Spelers.Remove(speler);
            await _appdbContext.SaveChangesAsync();
            return Ok(speler);
        }
    }
}
