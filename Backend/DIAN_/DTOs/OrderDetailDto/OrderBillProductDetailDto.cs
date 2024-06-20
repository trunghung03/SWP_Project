namespace DIAN_.DTOs.OrderDetailDto
{
    public class OrderBillProductDetailDto
    {
        public string ProductName { get; set; }
        public string ProductImageLink { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescription { get; set; }
        public decimal Size { get; set; }
        public decimal LineTotal { get; set; }
        public string CertificateScan { get; set; }
        public DateTime? WarrantyStartDate { get; set; }
        public DateTime? WarrantyEndDate { get; set; }
    }
}
