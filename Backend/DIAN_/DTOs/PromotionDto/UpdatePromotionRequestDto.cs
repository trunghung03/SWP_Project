using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.DTOs.PromotionDto
{
    public class UpdatePromotionRequestDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public bool Status { get; set; }
    }
}