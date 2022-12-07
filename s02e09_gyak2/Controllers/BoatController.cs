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

                if (k�rd�s == null)
            {
                int k�rd�sekSz�ma = context.Questions.Count();
                
                k�rd�s = (from x in context.Questions
                          where x.QuestionId == (sorsz�m % k�rd�sekSz�ma)
                          select x).FirstOrDefault();
            }
            return new JsonResult(k�rd�s);}


        
        [HttpGet]
        [Route("questions/count")]
        public int M4()
        {
            HajosContext context = new HajosContext();
            int k�rd�sekSz�ma = context.Questions.Count();

            return k�rd�sekSz�ma;
        }
    }
}