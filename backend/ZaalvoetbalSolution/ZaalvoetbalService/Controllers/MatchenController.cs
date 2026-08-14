using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZaalvoetbalService.Data;
using ZaalvoetbalService.Models;
using ZaalvoetbalService.DTOs;
namespace ZaalvoetbalService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchenController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public MatchenController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Match>>> GetMatchen()
        {
            return await _appDbContext.Matchen
                .Include(m => m.Doelpuntenmakers)
                .Include(m => m.Kaarten)
                .Include(m => m.Stemmen)
                .ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Match>> AddMatch(Match match)
        {
            _appDbContext.Matchen.Add(match);
            await _appDbContext.SaveChangesAsync();
            return Ok(match);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMatch(int id)
        {
            var match = await _appDbContext.Matchen.FindAsync(id);
            if (match == null) return NotFound();
            _appDbContext.Matchen.Remove(match);
            await _appDbContext.SaveChangesAsync();
            return Ok(match);
        }
        [HttpPut("{id}/score")]
        public async Task<ActionResult> PutScore(int id, [FromBody] ScoreDto score)
        {
            var match = await _appDbContext.Matchen.FindAsync(id);
            if (match == null) return NotFound();
            match.ThuisploegScore = score.ThuisploegScore;
            match.UitploegScore = score.UitploegScore;
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
        [HttpPost("{id}/doelpunten")]
        public async Task<ActionResult> PostDoelpunt(int id, [FromBody] Doelpunt doelpunt)
        {
            doelpunt.MatchId = id;
            _appDbContext.Doelpunten.Add(doelpunt);
            await _appDbContext.SaveChangesAsync();
            return Ok(doelpunt);
        }
        [HttpPost("{id}/kaarten")]
        public async Task<ActionResult> PostKaart(int id, [FromBody] Kaart kaart)
        {
            kaart.MatchId = id;
            _appDbContext.Kaarten.Add(kaart);
            await _appDbContext.SaveChangesAsync();
            return Ok(kaart);
        }
        [HttpDelete("{matchId}/kaarten/{kaartId}")]
        public async Task<ActionResult> DeleteKaart(int matchId, int kaartId)
        {
            var kaart = await _appDbContext.Kaarten.FindAsync(kaartId);
            if (kaart == null) return NotFound();
            _appDbContext.Kaarten.Remove(kaart);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
        [HttpPost("{id}/stemmen")]
        public async Task<ActionResult> PostStem(int id, [FromBody] Stem stem)
        {
            stem.MatchId = id;
            _appDbContext.Stemmen.Add(stem);
            await _appDbContext.SaveChangesAsync();
            return Ok(stem);
        }
    }
}