using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.DTOs.PromotionDto
{
    public class UpdatePromotionRequestDto
    {
        [Required]
        [MaxLength(150, ErrorMessage = "Name cannot be over 150 over characters")]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime ValidFrom { get; set; }
        [Required]
        public DateTime ValidTo { get; set; }
        public bool Status { get; set; }
    }
}