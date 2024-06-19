using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DIAN_.DTOs.ProductDTOs
{
    public class CreateProductRequestDTO
    {
        public string ProductCode { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public int MainDiamondId { get; set; }
        public decimal LaborPrice { get; set; }
        //      public List<IFormFile> ImageFiles { get; set; } = new List<IFormFile>(); // List of files
        public string imageLinkList { get; set; } = string.Empty;// = new List<string>(); // List of image URLs

        public int SubDiamondAmount { get; set; }
        public int? MainDiamondAmount { get; set; }
        public decimal? ShellAmount { get; set; }
        public int? CollectionId { get; set; }
        public int? CategoryId { get; set; }
    }
}
