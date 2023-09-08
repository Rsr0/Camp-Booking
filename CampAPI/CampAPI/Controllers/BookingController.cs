using BusinessLogic.Repository;
using DataAccess.DBContext;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace CampAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController :Controller
    {
      
        private readonly IBookingRepository _bookingRepository;
        public BookingController(IBookingRepository bookingRepository)
        {
         
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooking()
        {
            var bookings = await _bookingRepository.getBooking() ;
            return Ok(bookings);

        }


        [HttpPost]
        public async Task<IActionResult> AddBooking([FromBody] Booking bookRequest)
        {
          
            await _bookingRepository.addBooking(bookRequest);
        

            return Ok(bookRequest);

        }

        [HttpGet]
        [Route("{brn}")]
        public async Task<IActionResult> GetBookingDetails([FromRoute] string brn)
        {
            var booking = await _bookingRepository.getBookingDetails(brn);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpDelete]
        [Route("{brn}")]
        public async Task<IActionResult> DeleteBooking([FromRoute] string brn)
        {
            var booking = await _bookingRepository.deleteBooking(brn);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }




    }
}
