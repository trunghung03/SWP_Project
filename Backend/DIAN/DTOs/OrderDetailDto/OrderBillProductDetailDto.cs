namespace DIAN_.DTOs.OrderDetailDto
{
    public class OrderBillProductDetailDto
    {
        public string ProductName { get; set; }
        public string ProductImageLink { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescription { get; set; }
        public decimal Size { get; set; }
        public string ShellMaterial { get; set; }  
        public decimal LineTotal { get; set; }
    }
}
