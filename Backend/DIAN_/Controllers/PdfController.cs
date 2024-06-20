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
        public PdfController(IWarrantyRepository warrantyRepository)
        {
            _warrantyRepository = warrantyRepository;
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

            return Ok("PDF created successfully at " + Path.GetFullPath(outputPdfPath));
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
    }
}
