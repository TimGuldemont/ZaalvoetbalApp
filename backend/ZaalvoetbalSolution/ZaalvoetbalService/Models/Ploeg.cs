namespace ZaalvoetbalService.Models
{
    public class Ploeg
    {
        public int Id { get; set; }
        public string? Naam { get; set; }
        public List<Speler> Spelers { get; set; } = new();
    }
}
