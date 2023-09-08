using BusinessLogic.Repository;
using DataAccess.DBContext;
using DataAccess.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;



namespace CampAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampController : Controller
    {
        
        private readonly ICampRepository _campRepository;
      

        public CampController(ICampRepository campRepository)
        {
            _campRepository = campRepository;
          
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCamps()
        {
            var camps = await _campRepository.getAllCamps();
            return Ok(camps);

        }


        [HttpPost]
        public async Task<IActionResult> AddCamp([FromBody] Camp campRequest)
        {
            campRequest.Id = Guid.NewGuid();
            return Ok(await _campRepository.addCamp(campRequest));

        }



        [HttpGet]
        [Route("search/{checkIn}/{checkOut}/{capacity}")]
        public async Task<IActionResult> SearchBooking(DateTime CheckIN, DateTime CheckOUT, int capacity)

        {
            
            DateTime inDate = Convert.ToDateTime(CheckIN);
            DateTime outDate = Convert.ToDateTime(CheckOUT);


            var result = _campRepository.searchBooking(CheckIN, CheckOUT, capacity);
            return Ok(result);

        }

        [HttpGet]
        [Route("filter")]
        public async Task<IActionResult> FilterCamps()

        {

            var result = _campRepository.filterCamps();
            return Ok(result);

        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCamp([FromRoute] Guid id)
        {
            var camp = await _campRepository.getCamp(id);
            if (camp == null)
            {
                return NotFound();
            }
            return Ok(camp);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateCamp([FromRoute] Guid id, Camp campRequest)
        {
            var camp = await _campRepository.updateCamp(id, campRequest);
            if (camp == null)
            {
                return NotFound();
            }
            return Ok(camp);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCamp([FromRoute] Guid id)
        {
            var camp = await _campRepository.deleteCamp(id);
            if (camp == null)
            {
                return NotFound();
            }

            return Ok(camp);
        }
    }
}
