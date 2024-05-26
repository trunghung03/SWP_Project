namespace DIAN_.DTOs.WarrantyDTO
{
    public class UpdateWarrantyRequestDto
    {
        public int OrderDetailId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Status { get; set; }
    }
}
