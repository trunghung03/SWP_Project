using DIAN_.Interfaces;
using iText.Html2pdf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/pdf")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        public PdfController(IWarrantyRepository warrantyRepository, IHttpClientFactory httpClientFactory)
        {
            _warrantyRepository = warrantyRepository;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("warranty")]
        public async Task<IActionResult> WarrantyPdf()
        {
            // Define the HTML content
            string htmlContent = @"
            <html>
            <head>
                <title>Sample HTML to PDF</title>
            </head>
            <body>
                <h1>Hello, World!</h1>
                <p>This is a sample HTML to PDF conversion using iText7.</p>
            </body>
            </html>";

            // Define the output PDF file path
            string outputPdfPath = "output.pdf";

            // Convert HTML to PDF
            ConvertHtmlToPdf(htmlContent, outputPdfPath);

            // Upload the PDF to Pixeldrain
            string uploadUrl = await UploadPdfToPixeldrain(outputPdfPath);

            // Delete the local PDF file
            if (System.IO.File.Exists(outputPdfPath))
            {
                System.IO.File.Delete(outputPdfPath);
            }

            return Ok("PDF uploaded successfully to " + uploadUrl);
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

        private async Task<string> UploadPdfToPixeldrain(string filePath)
        {
            using (var client = _httpClientFactory.CreateClient())
            using (var content = new MultipartFormDataContent())
            using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                content.Add(new StreamContent(fileStream), "file", Path.GetFileName(filePath));

                var response = await client.PutAsync("https://pixeldrain.com/api/file", content);
                response.EnsureSuccessStatusCode();

                var responseContent = await response.Content.ReadAsStringAsync();

                // Parse the response to get the URL
                // Assuming the response contains a JSON object with a "link" field
                var jsonResponse = System.Text.Json.JsonDocument.Parse(responseContent);
                var fileId = jsonResponse.RootElement.GetProperty("link").GetString();

                return "https://pixeldrain.com/u/" + fileId;
            }
        }
    }
}
