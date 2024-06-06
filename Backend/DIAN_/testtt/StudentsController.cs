using DIAN_.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.testtt
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        public StudentsController(ILoggerManager logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInfo("Fetching all the students");
            var students = DataManager.GetAll();

            throw new Exception("exception while...");
            _logger.LogInfo($"Returning {students.Count} students.");

            return Ok(students);
        }
    }
}
