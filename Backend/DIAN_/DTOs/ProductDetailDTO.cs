﻿namespace DIAN_.DTOs
{
    public class ProductDetailDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string ProCode { get; set; }
        public string Description { get; set; }
        public decimal Carat { get; set; }
        public List<string> SubDiamond { get; set; } 
    }
}
