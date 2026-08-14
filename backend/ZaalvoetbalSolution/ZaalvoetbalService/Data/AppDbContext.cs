using Microsoft.EntityFrameworkCore;
using ZaalvoetbalService.Models;
namespace ZaalvoetbalService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Match> Matchen { get; set; }
        public DbSet<Doelpunt> Doelpunten { get; set; }
        public DbSet<Kaart> Kaarten { get; set; }
        public DbSet<Stem> Stemmen { get; set; }
        public DbSet<Speler> Spelers { get; set; }
        public DbSet<Ploeg> Ploegen { get; set; }
    }
}
