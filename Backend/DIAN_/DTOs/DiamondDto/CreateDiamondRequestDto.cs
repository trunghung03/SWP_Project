namespace DIAN_.DTOs.DiamondDto
{
    public class CreateDiamondRequestDto
    {
        public int DiamondId { get; set; }

        public string Name { get; set; }

        //public string Color { get; set; }

        //public string Clarity { get; set; }

        //public string Cut { get; set; }

        //public decimal Carat { get; set; }

        public decimal Cost { get; set; }

        //public string CertificateScan { get; set; }

        public decimal DiamondSize { get; set; }

        public int AmountAvailable { get; set; }

        public bool Status { get; set; }

    }
}
