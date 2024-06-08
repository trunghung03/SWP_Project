using DIAN_.Interfaces;
using DIAN_.Tesst;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/students")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ILoggerManager _logger;
        public StudentsController(ILoggerManager logger) => _logger = logger;

        //[HttpGet]
        //public IActionResult Get()
        //{
        //    _logger.LogInfo("Fetching all the Students from the storage");

        //    var students = DataManager.GetAllStudents(); //simulation for the data base access

        //    throw new Exception("Exception while fetching all the students from the storage.");

        //    _logger.LogInfo($"Returning {students.Count} students.");

        //    return Ok(students);
        //}

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                _logger.LogInfo("Fetching all the Students from the storage");

                var students = DataManager.GetAllStudents(); //simulation for the data base access

                _logger.LogInfo($"Returning {students.Count} students.");

                return Ok(students);
            }
            catch (Exception ex)
            {
                throw new Exception("Exception while fetching all the students from the storage.");
            }
        }

    }
}