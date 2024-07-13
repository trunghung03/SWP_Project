namespace DIAN_.DTOs.ProductDTOs
{
    public class ManageProductDetailDto
    {
        public string CategoryName { get; set; }
        public string CollectionName { get; set; }
        public int ProductID { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int? MainDiamondID { get; set; }
        public int? SubDiamondID { get; set; }
        public decimal? LaborCost { get; set; }
        public string ImageLinkList { get; set; }
        public int? SubDiamondAmount { get; set; }
        public int? MainDiamondAmount { get; set; }
        public int AmountAvailable { get; set; }
        public string MaterialName { get; set; }
    }
}
