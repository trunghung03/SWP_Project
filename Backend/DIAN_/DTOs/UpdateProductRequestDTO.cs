namespace DIAN_.DTOs
{
    public class UpdateProductRequestDTO
    {
        public string ProCode { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public int MainDiamondId { get; set; }

        public decimal ChargeUp { get; set; }

        public decimal LaborPrice { get; set; }

        public string ImageLinkList { get; set; }

        public int SubDiamondAmount { get; set; }
    }
}
