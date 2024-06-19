﻿using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.SizeDTO
{
    public class CreateSizeRequestDto
    {
        [Required]
        public int CategoryId { get; set; }
        [Required]
        [Range(0, 25)]
        public decimal? MinSize { get; set; }
        [Required]
        [Range(0, 25)]
        public decimal? MaxSize { get; set; }
        [Required]
        public decimal? Step { get; set; }

    }
}
