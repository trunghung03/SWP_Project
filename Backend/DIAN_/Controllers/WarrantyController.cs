using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.IO;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarrantyController : ControllerBase
    {
        private readonly PythonService _pythonService;

        public WarrantyController(PythonService pythonService)
        {
            _pythonService = pythonService;
        }

        [HttpPost("generate")]
        public IActionResult GenerateWarranty([FromBody] WarrantyDTO data)
        {
            try
            {
                if (data == null)
                {
                    return BadRequest("Data is required.");
                }

                var warrantyData = new
                {
                    data.CustomerName,
                    data.DateOfPurchase,
                    Service = "Diamond Insurance",
                    data.IdNumber,
                    data.WarrantyPeriodStart,
                    data.WarrantyPeriodEnd
                };

                var jsonData = JsonConvert.SerializeObject(warrantyData);
                Console.WriteLine("JSON Data before passing: " + jsonData); // Log the JSON data before passing

                var pdfPath = _pythonService.ExecutePythonScript(jsonData);

                if (System.IO.File.Exists(pdfPath))
                {
                    var fileBytes = System.IO.File.ReadAllBytes(pdfPath);
                    return File(fileBytes, "application/pdf", Path.GetFileName(pdfPath));
                }

                return BadRequest("Failed to generate warranty.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating PDF: {ex.Message}");
                return StatusCode(500, $"Error generating PDF: {ex.Message}");
            }
        }
    }
}
