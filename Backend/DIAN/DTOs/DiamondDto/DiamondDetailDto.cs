namespace DIAN_.DTOs.DiamondDto
{
    // for find diamond by order detail id
    public class DiamondDetailDto
    {
        public int DiamondId { get; set; }

        public string Shape { get; set; } = string.Empty;

        public string Color { get; set; } = string.Empty;

        public string Clarity { get; set; } = string.Empty;

        public string Cut { get; set; } = string.Empty;

        public decimal Carat { get; set; }

        public decimal Cost { get; set; }

        public string CertificateScan { get; set; } = string.Empty;

        public int OrderDetailId { get; set; }

    }
}
