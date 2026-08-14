namespace ZaalvoetbalService.Models
{
    public class Speler
    {
        public int Id { get; set; }
        public string? Naam { get; set; }
        public int PloegId { get; set; }
        public Ploeg? Ploeg { get; set; }
    }
}
