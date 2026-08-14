namespace ZaalvoetbalService.Models
{
    public class Match
    {
        public int Id { get; set; }
        public string? Thuisploeg { get; set; }
        public string? Uitploeg { get; set; }
        public int ThuisploegScore { get; set; }
        public int UitploegScore { get; set; }
        public string? Uur { get; set; }
        public string? Datum { get; set; }
        public List<Speler> Doelpuntenmakers { get; set; } = new();
        public List<Kaart> Kaarten { get; set; } = new();
        public List<Stem> Stemmen { get; set; } = new();
    }
}
