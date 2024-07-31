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
    [Route("api/pixeldrain")]
    [ApiController]
    public class PixeldrainController : ControllerBase
    {
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        public PixeldrainController(IWarrantyRepository warrantyRepository, IDiamondRepository diamondRepository, IHttpClientFactory httpClientFactory)
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
            var customerName = await _warrantyRepository.GetCustomerNameOfWarranty(warranty);

            if (warranty == null)
            {
                return NotFound();
            }
            try
            {

                // Read the HTML template from warrantyTemplate.html
                string htmlTemplatePath = "warrantyTemplate.html";
                string htmlContent =  System.IO.File.ReadAllText(htmlTemplatePath);

                // Replace placeholders in the HTML template with actual warranty data
                htmlContent = htmlContent.Replace("{OrderDetailId}", warranty.OrderDetailId.ToString())
                                         .Replace("{StartDate}", warranty.StartDate.ToString("yyyy-MM-dd"))
                                         .Replace("{EndDate}", warranty.EndDate.ToString("yyyy-MM-dd"))
                                         .Replace("{Status}", warranty.Status.ToString() ?? "Active")
                                         .Replace("{CustomerName}", customerName ?? "N/A");

                // Define the output PDF file path
                string outputPdfPath = $"warranty-{warranty.OrderDetailId}.pdf";

                // Convert HTML to PDF
                ConvertHtmlToPdf(htmlContent, outputPdfPath);

                // Upload the PDF to Pixeldrain
                var uploadResult = await UploadPdfToPixeldrain(outputPdfPath);
                dynamic result = uploadResult;
                string uploadUrl = result.url;

                if (!string.IsNullOrEmpty(uploadUrl))
                {
                    // Delete the local PDF file
                    if (System.IO.File.Exists(outputPdfPath))
                    {
                        System.IO.File.Delete(outputPdfPath);
                    }

                    return Ok(new { url = uploadUrl });
                }
            }catch (Exception)
            {
                throw;
            }
            return null;
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

            // Check if DiamondAttribute is null and attempt to fetch it using its ID
            if (diamond.MainDiamondAtrribute == null)
            {
                // Assuming GetDiamondAttributeByIdAsync is a method in your repository to fetch DiamondAttribute by ID
                diamond.MainDiamondAtrribute = await _diamondRepository.GetDiamondAttributeByIdAsync(id);
            }

            // Proceed only if DiamondAttribute is not null
            if (diamond.MainDiamondAtrribute == null)
            {
                return NotFound("Diamond attribute not found.");
            }

            // Read the HTML template from diamondTemplate.html
            string htmlTemplatePath = "certificateTemplate.html";
            string htmlContent = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            // Replace placeholders in the HTML template with actual diamond data
            htmlContent = htmlContent.Replace("{DiamondId}", diamond.DiamondId.ToString()) //take main diamond attribute
                                     .Replace("{Shape}", diamond.MainDiamondAtrribute.Shape)
                                     .Replace("{Color}", diamond.MainDiamondAtrribute.Color)
                                     .Replace("{Clarity}", diamond.MainDiamondAtrribute.Clarity)
                                     .Replace("{Carat}", diamond.MainDiamondAtrribute.Carat.ToString() ?? "N/A")
                                     .Replace("{Cut}", diamond.MainDiamondAtrribute.Cut)
                                     .Replace("{OrderDetailId}", diamond.OrderDetailId.ToString() ?? "N/A")
                                     .Replace("{Shape}", diamond.MainDiamondAtrribute.Shape);

            // Define the output PDF file path
            string outputPdfPath = "certificate.pdf";

            // Convert HTML to PDF
            ConvertHtmlToPdf(htmlContent, outputPdfPath);

            // Upload the PDF to Pixeldrain
            var uploadResult = await UploadPdfToPixeldrain(outputPdfPath);
            dynamic result = uploadResult;
            string uploadUrl = result.url;

            if (!string.IsNullOrEmpty(uploadUrl))
            {
                // Delete the local PDF file
                if (System.IO.File.Exists(outputPdfPath))
                {
                    System.IO.File.Delete(outputPdfPath);
                }

                return Ok(new { url = uploadUrl });
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to upload PDF to Pixeldrain.");
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadFileToPixeldrain(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded or file is empty.");
            }

            string tempFilePath = Path.GetTempFileName();
            string fileName = file.FileName;

            try
            {
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Upload the file to Pixeldrain and receive an object with the URL
                var uploadResult = await UploadPdfToPixeldrain(tempFilePath, fileName);

                return Ok(uploadResult);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
            finally
            {
                if (System.IO.File.Exists(tempFilePath))
                {
                    System.IO.File.Delete(tempFilePath);
                }
            }
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

        static async Task<object> UploadPdfToPixeldrain(string filePath, string fileName = null)
        {
            using (var client = new HttpClient())
            using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                using (var form = new MultipartFormDataContent())
                {
                    form.Add(new StreamContent(fileStream), "file", Path.GetFileName(filePath));

                    if (fileName != null)
                    {
                        form.Add(new StringContent(fileName), "name");
                    }

                    // Add the API key in the headers
                    var apiKey = "78159216-1c26-4e2a-bb85-d4c08b04b949";
                    var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes(":" + apiKey));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);


                    var response = await client.PostAsync("https://pixeldrain.com/api/file", form);

                    if (!response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();
                        throw new HttpRequestException($"Failed to upload PDF. Status code: {response.StatusCode}, Response: {responseContent}");
                    }

                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var jsonDocument = System.Text.Json.JsonDocument.Parse(jsonResponse);
                    var fileId = jsonDocument.RootElement.GetProperty("id").GetString();

                    // Return an object with the URL
                    return new { url = "https://pixeldrain.com/api/file/" + fileId };
                }
            }
        }


    }
}
