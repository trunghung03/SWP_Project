namespace DIAN_.DTOs.WarrantyDTO
{
    public class WarrantyDetailDto
    {
        public int OrderDetailId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Status { get; set; }
    }
}
