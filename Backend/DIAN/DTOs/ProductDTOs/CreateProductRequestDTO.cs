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

        [StringLength(255, ErrorMessage = "Description must not exceed 100 characters.")]
        public string Description { get; set; } = string.Empty;

        public int? MainDiamondAttributeId { get; set; }

        public int? SubDiamondAttributeId { get; set; }

        [Required(ErrorMessage = "Labor price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Labor price must be non-negative.")]
        public decimal LaborPrice { get; set; }

        [Required(ErrorMessage = "Image link list is required.")]
        public string imageLinkList { get; set; } = string.Empty;

        public int SubDiamondAmount { get; set; }

        public int MainDiamondAmount { get; set; }

        public int? CollectionId { get; set; }

        public int CategoryId { get; set; }

        public bool Status { get; set; }
    }

}
