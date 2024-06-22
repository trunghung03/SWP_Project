using DIAN_.Interfaces;
using DIAN_.Models;
using DIAN_.Repository;
using iText.Html2pdf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;

namespace DIAN_.Controllers
{
    [Route("api/pdf")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        public PdfController(IWarrantyRepository warrantyRepository, IDiamondRepository diamondRepository, IHttpClientFactory httpClientFactory)
        {
            _warrantyRepository = warrantyRepository;
            _httpClientFactory = httpClientFactory;
            _diamondRepository = diamondRepository;
        }

        [HttpGet("warranty")]
        public async Task<IActionResult> WarrantyPdf(int id)
        {
            // Retrieve warranty data from the repository
            var warranty = await _warrantyRepository.GetWarrantyByIdAsync(id);
            
            if (warranty == null)
            {
                return NotFound();
            }

            // Read the HTML template from warrantyTemplate.html
            string htmlTemplatePath = "warrantyTemplate.html";
            string htmlContent = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            // Replace placeholders in the HTML template with actual warranty data
            htmlContent = htmlContent.Replace("{OrderDetailId}", warranty.OrderDetailId.ToString())
                                     .Replace("{StartDate}", warranty.StartDate.ToString("yyyy-MM-dd"))
                                     .Replace("{EndDate}", warranty.EndDate.ToString("yyyy-MM-dd"))
                                     .Replace("{Status}", warranty.Status ? "Active" : "Inactive");

            // Define the output PDF file path
            string outputPdfPath = "warranty.pdf";

            // Convert HTML to PDF
            ConvertHtmlToPdf(htmlContent, outputPdfPath);

            // Upload the PDF to Pixeldrain
            string uploadUrl = await UploadPdfToPixeldrain(outputPdfPath);

            // Delete the local PDF file
            if (System.IO.File.Exists(outputPdfPath))
            {
                System.IO.File.Delete(outputPdfPath);
            }

            return Ok(uploadUrl);
        }

        [HttpGet("certificate")]
        public async Task<IActionResult> CertificatePdf(int id)
        {
            // Retrieve diamond data from the repository
            var diamond = await _diamondRepository.GetDiamondByIdAsync(id);

            if (diamond == null)
            {
                return NotFound();
            }

            // Read the HTML template from diamondTemplate.html
            string htmlTemplatePath = "certificateTemplate.html";
            string htmlContent = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            // Replace placeholders in the HTML template with actual diamond data
            htmlContent = htmlContent.Replace("{DiamondId}", diamond.DiamondId.ToString())
                                     .Replace("{Shape}", diamond.Shape)
                                     .Replace("{Color}", diamond.Color)
                                     .Replace("{Clarity}", diamond.Clarity)
                                     .Replace("{Carat}", diamond.Carat?.ToString() ?? "N/A")
                                     .Replace("{Cut}", diamond.Cut);

            // Define the output PDF file path
            string outputPdfPath = "certificate.pdf";

            // Convert HTML to PDF
            ConvertHtmlToPdf(htmlContent, outputPdfPath);

            // Upload the PDF to Pixeldrain
            string uploadUrl = await UploadPdfToPixeldrain(outputPdfPath);

            // Delete the local PDF file
            if (System.IO.File.Exists(outputPdfPath))
            {
                System.IO.File.Delete(outputPdfPath);
            }

            return Ok(uploadUrl);
        }

        static void ConvertHtmlToPdf(string html, string outputPath)
        {
            // Create a stream to write the PDF
            using (FileStream pdfDest = new FileStream(outputPath, FileMode.Create, FileAccess.Write))
            {
                // Convert the HTML to PDF and write it to the output stream
                HtmlConverter.ConvertToPdf(html, pdfDest);
            }
        }

        static async Task<string> UploadPdfToPixeldrain(string filePath)
        {
            using (var client = new HttpClient())
            using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                // Create a MultipartFormDataContent object to hold the file and form data
                using (var form = new MultipartFormDataContent())
                {
                    // Add the file content to the form
                    form.Add(new StreamContent(fileStream), "file", Path.GetFileName(filePath));

                    // Perform the POST request to upload the file
                    var response = await client.PostAsync("https://pixeldrain.com/api/file", form);

                    if (!response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();
                        throw new HttpRequestException($"Failed to upload PDF. Status code: {response.StatusCode}, Response: {responseContent}");
                    }

                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var jsonDocument = System.Text.Json.JsonDocument.Parse(jsonResponse);
                    var fileId = jsonDocument.RootElement.GetProperty("id").GetString();

                    return "https://pixeldrain.com/u/" + fileId;
                }
            }
        }

    }
}
