using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.DTOs.PromotionDto
{
    public class PromotionList
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}