﻿using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class UpdateCollectionDTO
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, ErrorMessage = "Description must not exceed 500 characters.")]
        public string? Description { get; set; }
        [Required(ErrorMessage ="Status is required")]
        public bool? Status { get; set; }
        [Url(ErrorMessage = "Image link must be a valid URL.")]
        public string? ImageLink { get; set; }
    }
}
