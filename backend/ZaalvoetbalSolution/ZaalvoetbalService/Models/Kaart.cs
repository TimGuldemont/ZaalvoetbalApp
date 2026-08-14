namespace ZaalvoetbalService.Models
{
    public class Kaart
    {
        public int Id { get; set; }
        public int MatchId { get; set; }
        public Match? Match { get; set; }
        public string? SpelerNaam { get; set; }
        public string? Kleur { get; set; } 
        public string? Ploeg { get; set; }
    }
}
