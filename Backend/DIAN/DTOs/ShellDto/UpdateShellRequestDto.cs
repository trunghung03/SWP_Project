namespace DIAN_.DTOs.ShellDto
{
    public class UpdateShellRequestDto
    {
        public int ProductId { get; set; }

        public int ShellMaterialId { get; set; }

        public int SubDiamondId { get; set; }

        public int SubDiamondAmount { get; set; }

        public decimal Weight { get; set; }

        public int AmountAvailable { get; set; }

        public bool Status { get; set; }
    }
}
