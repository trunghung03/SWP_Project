using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.DiamondDto
{
    public class UpdateDiamondCertificateDto
    {
        [Required(ErrorMessage = "Certificate scan is required.")]
        public string CertificateScan { get; set; } = string.Empty;
    }
}
