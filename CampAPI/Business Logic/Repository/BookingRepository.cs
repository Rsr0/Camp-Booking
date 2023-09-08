using DataAccess.DBContext;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public class BookingRepository : IBookingRepository
    {

        private readonly CampDbContext _campDbContext;
        public BookingRepository(CampDbContext campDbcontext)
        {
            _campDbContext = campDbcontext;
        }


        public async Task<List<Booking>> getBooking()
        {
            var bookings = await _campDbContext.Bookings.ToListAsync();
            return bookings;

        }

        public async Task<Booking> addBooking([FromBody] Booking bookRequest)
        {
            /*  bookRequest.Id = Guid.NewGuid();*/
            await _campDbContext.Bookings.AddAsync(bookRequest);
            await _campDbContext.SaveChangesAsync();

            return bookRequest;

        }

        public async Task<Booking> getBookingDetails([FromRoute] string brn)
        {
            var booking = await _campDbContext.Bookings.FirstOrDefaultAsync(x => x.brn == brn);

            return booking;
        }



        public async Task<Booking> deleteBooking([FromRoute] string brn)
        {
            var booking = await _campDbContext.Bookings.FindAsync(brn);
            _campDbContext.Bookings.Remove(booking);
            await _campDbContext.SaveChangesAsync();
            return booking;
        }


        private IActionResult NotFound()
        {
            throw new NotImplementedException();
        }
        private IActionResult Ok(object bookings)
        {
            throw new NotImplementedException();
        }
    }
}
