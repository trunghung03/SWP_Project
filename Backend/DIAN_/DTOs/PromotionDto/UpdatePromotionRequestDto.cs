using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.DTOs.PromotionDto
{
    public class UpdatePromotionRequestDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(150, ErrorMessage = "Name cannot be over 150 characters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Code is required.")]
        [StringLength(50, ErrorMessage = "Code must not exceed 50 characters.")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Amount is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Amount must be a non-negative number.")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(500, ErrorMessage = "Description cannot be over 500 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Valid from date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Valid from must be a valid date.")]
        public DateTime ValidFrom { get; set; }

        [Required(ErrorMessage = "Valid to date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Valid to must be a valid date.")]
        public DateTime ValidTo { get; set; }

        public bool Status { get; set; } = true;
    }
}