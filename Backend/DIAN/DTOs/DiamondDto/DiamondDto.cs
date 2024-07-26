namespace DIAN_.DTOs.DiamondDto
{
    public class DiamondDto
    {
        public int DiamondId { get; set; }
        public int DiamondAttributeId { get; set; }

        public string Shape { get; set; } = string.Empty;

        public string Color { get; set; } = string.Empty;

        public string Clarity { get; set; } = string.Empty;

        public string Cut { get; set; } = string.Empty;

        public decimal Carat { get; set; }

        public decimal Price { get; set; }

        public string CertificateScan { get; set; } = string.Empty;


    }
}
