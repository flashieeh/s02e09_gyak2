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
           
                var kérdések = from x in context.Questions select x.Question1;
                return Ok(kérdések);

        }

        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M2(int sorszám)
        {
            HajosContext context = new HajosContext();


                var kérdés = (from x in context.Questions
                              where x.QuestionId == sorszám
                              select x).FirstOrDefault();

                if (kérdés == null)
            {
                int kérdésekSzáma = context.Questions.Count();
                
                kérdés = (from x in context.Questions
                          where x.QuestionId == (sorszám % kérdésekSzáma)
                          select x).FirstOrDefault();
            }
            return new JsonResult(kérdés);}


        
        [HttpGet]
        [Route("questions/count")]
        public int M4()
        {
            HajosContext context = new HajosContext();
            int kérdésekSzáma = context.Questions.Count();

            return kérdésekSzáma;
        }
    }
}