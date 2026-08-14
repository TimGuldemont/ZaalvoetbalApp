using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZaalvoetbalService.Data;
using ZaalvoetbalService.Models;

namespace ZaalvoetbalService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PloegenController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public PloegenController (AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ploeg>>> GetPloegen()
        {
            return await _appDbContext.Ploegen.Include(p => p.Spelers).ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Ploeg>> PloegToevoegen(Ploeg ploeg)
        {
            _appDbContext.Ploegen.Add(ploeg);
            await _appDbContext.SaveChangesAsync();
            return Ok(ploeg);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ploeg>> DeletePloeg(int id)
        {
            var ploeg = await _appDbContext.Ploegen.FindAsync(id);
            if (ploeg == null) return NotFound();
            _appDbContext.Ploegen.Remove(ploeg);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
