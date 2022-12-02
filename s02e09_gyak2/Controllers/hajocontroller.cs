using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace s02e09_gyak2.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class hajocontroller : ControllerBase
    {
        [HttpGet]
        [Route("corvinus/szerverido")]
        public IActionResult M1()
        {
            string pIdõ = DateTime.Now.ToShortTimeString();

            return Ok(pIdõ);
        }

        [HttpGet]
        [Route("corvinus/nagybetus/{szoveg}")]
        public IActionResult M2(string szoveg)
        {
            try
            {
                return Ok(szoveg.ToUpper());
            }
            catch (Exception ex)
            {
                return BadRequest("Nem jó a bemenõ adat");
            }
        }
    }
    
}