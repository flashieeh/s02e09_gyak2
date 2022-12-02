using Microsoft.AspNetCore.Mvc;
using s02e09_gyak2.Models;

namespace s02e09_gyak2.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public IActionResult AllQuestions()
        {
            HajosContext context = new HajosContext();
            var k�rd�sek = from x in context.Questions select x.Question1;

            return Ok(k�rd�sek);
        }

        [HttpGet]
        [Route("questions/{sorsz�m}")]
        public ActionResult M2(int sorsz�m)
        {
            HajosContext context = new HajosContext();
            var k�rd�s = (from x in context.Questions
                          where x.QuestionId == sorsz�m
                          select x).FirstOrDefault();

            if (k�rd�s == null) return BadRequest("Nincs ilyen sorsz�m� k�rd�s");

            return new JsonResult(k�rd�s);
        }
    }
}