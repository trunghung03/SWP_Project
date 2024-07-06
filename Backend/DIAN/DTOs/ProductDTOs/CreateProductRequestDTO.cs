using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.ProductDTOs
{
    public class CreateProductRequestDTO
    {
        [Required(ErrorMessage = "Product code is required.")]
        [StringLength(50, ErrorMessage = "Product code must not exceed 50 characters.")]
        public string ProductCode { get; set; } = string.Empty;

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        [StringLength(500, ErrorMessage = "Description must not exceed 500 characters.")]
        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; } = string.Empty;

        //[Required(ErrorMessage = "Main diamond ID is required.")]
        //public int MainDiamondId { get; set; }

        //[Required(ErrorMessage = "Sub diamond ID is required.")]
        //public int SubDiamondId { get; set; }

        [Required(ErrorMessage = "Labor price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Labor price must be non-negative.")]
        public decimal LaborPrice { get; set; }

        // [Required(ErrorMessage = "At least one image file is required.")]
        // public List<IFormFile> ImageFiles { get; set; } = new List<IFormFile>();

        [Required(ErrorMessage = "Image link list is required.")]
        public string imageLinkList { get; set; } = string.Empty;

        //[Required(ErrorMessage = "Sub diamond amount is required.")]
        //[Range(0, int.MaxValue, ErrorMessage = "Sub diamond amount must be non-negative.")]
        //public int SubDiamondAmount { get; set; }

        //[Range(0, int.MaxValue, ErrorMessage = "Main diamond amount must be non-negative.")]
        //public int? MainDiamondAmount { get; set; }

        //[Range(0, double.MaxValue, ErrorMessage = "Shell amount must be non-negative.")]
        //public decimal? ShellAmount { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Collection ID must be a positive number.")]
        public int? CollectionId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Category ID must be a positive number.")]
        [Required(ErrorMessage = "Category ID is required.")]
        public int? CategoryId { get; set; }
    }
}
