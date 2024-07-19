namespace DIAN_.DTOs.ShellDto
{
    public class ShellDto
    {
        public int ShellId { get; set; }
        public int ProductId { get; set; }

        public int ShellMaterialId { get; set; }

        public decimal Weight { get; set; }

        public int AmountAvailable { get; set; }
        public string ShellMaterialName { get; set; }
        public decimal Size { get; set; }

        public bool Status { get; set; }
    }
}
