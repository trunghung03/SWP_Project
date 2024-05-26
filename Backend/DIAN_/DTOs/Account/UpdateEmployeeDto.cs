﻿using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.Account
{
    public class UpdateEmployeeDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? Role { get; set; }
    }
}
