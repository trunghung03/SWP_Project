namespace DIAN_.DTOs.DiamondAttributeDto
{
    public class DiamondAttributeDto
    {
        public int DiamondAttributeId { get; set; }
        public string Shape { get; set; } = string.Empty;

        public string Color { get; set; } = string.Empty;

        public string Clarity { get; set; } = string.Empty;

        public string Cut { get; set; } = string.Empty;

        public decimal Carat { get; set; }
    }
}
