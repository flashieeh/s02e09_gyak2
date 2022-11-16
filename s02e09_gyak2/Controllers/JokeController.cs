using Microsoft.AspNetCore.Mvc;
using s02e09_gyak2.JokeModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmptyBoat.Controllers
{
    [Route("api/jokes")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        // GET: api/<JokeController>
        [HttpGet]
        public IActionResult Get()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            return Ok(context.Jokes);
        }

        [HttpGet("{name}")]
        public IActionResult Get(string s)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var ki = from x in context.Jokes
                     select x.JokeText;

            return Ok(ki);
        }

        // GET api/<JokeController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var keresettVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            if (keresettVicc == null)
            {
                return NotFound($"Nincs #{id} azonos�t�val vicc");
            }
            else
            {
                return Ok(keresettVicc);
            }
        }

        // POST api/<JokeController>
        [HttpPost]
        public void Post([FromBody] Joke �jVicc)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            context.Jokes.Add(�jVicc);
            context.SaveChanges();
        }


        // PUT api/<JokeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JokeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var t�rlend�Vicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            context.Remove(t�rlend�Vicc);
            context.SaveChanges();
        }
    }
}