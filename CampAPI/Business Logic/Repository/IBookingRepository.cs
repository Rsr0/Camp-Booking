using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public interface IBookingRepository
    {
        Task<Booking> addBooking([FromBody] Booking bookRequest);
        Task<Booking> deleteBooking([FromRoute] string brn);
        Task<List<Booking>> getBooking();
        Task<Booking> getBookingDetails([FromRoute] string brn);
    }
}