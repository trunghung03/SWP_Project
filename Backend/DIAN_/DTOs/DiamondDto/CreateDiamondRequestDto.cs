namespace DIAN_.DTOs.DiamondDto
{
    public class CreateDiamondRequestDto
    {

        public string Shape { get; set; } = string.Empty;

        public string Color { get; set; } = string.Empty;

        public string Clarity { get; set; } = string.Empty;

        public string Cut { get; set; } = string.Empty;

        public decimal Carat { get; set; }

        public decimal Cost { get; set; }
        public string CertificateScan { get; set; } = string.Empty;

        public int AmountAvailable { get; set; }

        public bool Status { get; set; }

    }
}
