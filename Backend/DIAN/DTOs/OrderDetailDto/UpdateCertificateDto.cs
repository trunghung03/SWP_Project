using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.OrderDetailDto
{
    public class UpdateCertificateDto
    {
        [Required(ErrorMessage = "Certificate scan is required.")]
        public string CertificateScan { get; set; } = string.Empty;
    }
}
