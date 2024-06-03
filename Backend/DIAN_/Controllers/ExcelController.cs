using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Collections.Generic;
using System.IO;

[Route("api/[controller]")]
[ApiController]
public class ExcelController : ControllerBase
{
    [HttpGet("read")]
    public IActionResult ReadExcel()
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Excel.xlsx");

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound("File not found.");
        }

        List<ExcelDataDTO> data = new List<ExcelDataDTO>();

        using (var package = new ExcelPackage(new FileInfo(filePath)))
        {
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            for (int row = 2; row <= rowCount; row++)
            {
                data.Add(new ExcelDataDTO
                {
                    Column1 = int.Parse(worksheet.Cells[row, 1].Text),
                    Column2 = worksheet.Cells[row, 2].Text
                });
            }
        }

        var processedData = ProcessData(data);

        return Ok(processedData);
    }

    private List<ExcelDataDTO> ProcessData(List<ExcelDataDTO> data)
    {
        // Custom logic for processing data
        foreach (var item in data)
        {
            // Example: Multiply Column1 by 2 and convert Column2 to uppercase
            item.Column1 *= 2;
            item.Column2 = item.Column2.ToUpper();
        }

        return data;
    }
}
