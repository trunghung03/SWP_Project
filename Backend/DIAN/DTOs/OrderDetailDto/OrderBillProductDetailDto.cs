namespace DIAN_.DTOs.OrderDetailDto
{
    public class OrderBillProductDetailDto
    {
        public int OrderDetailId { get; set; }
        public string ProductName { get; set; }
        public string ProductImageLink { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescription { get; set; }
        public decimal Size { get; set; }
        public string ShellMaterial { get; set; }
        public List<int>? MainDiamondId { get; set; }
        public List<string> CertificateScans { get; set; } = new List<string>();
        public decimal LineTotal { get; set; }
    }
}
