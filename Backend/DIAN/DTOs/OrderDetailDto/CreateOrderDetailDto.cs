﻿using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.OrderDetailDto
{
    public class CreateOrderDetailDto
    {
        [Required(ErrorMessage = "Order ID is required.")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Line total is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Line total must be greater than 0.")]
        public decimal LineTotal { get; set; }

        [Required(ErrorMessage = "Product ID is required.")]
        public int ProductId { get; set; }

        public int? ShellId { get; set; }

    }
}
