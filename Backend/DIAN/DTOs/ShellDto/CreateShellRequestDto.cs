namespace DIAN_.DTOs.ShellDto
{
    public class CreateShellRequestDto
    {
        public int? ProductId { get; set; }

        public int ShellMaterialId { get; set; }

        public  decimal Weight { get; set; }

        public int AmountAvailable { get; set; }

        public List<decimal> Sizes { get; set; } = new List<decimal>();
        public bool Status { get; set; }
    }
}
