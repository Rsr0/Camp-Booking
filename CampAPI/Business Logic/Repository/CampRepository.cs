using DataAccess.DBContext;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public class CampRepository : ICampRepository
    {
        private readonly CampDbContext _campDbContext;
        public CampRepository(CampDbContext campDbContext)
        {
            _campDbContext = campDbContext;
        }


        public async Task<List<Camp>> getAllCamps()
        {
            return await _campDbContext.Camps.ToListAsync();


        }



        public async Task<Camp> addCamp([FromBody] Camp campRequest)
        {

            await _campDbContext.Camps.AddAsync(campRequest);
            await _campDbContext.SaveChangesAsync();

            return campRequest;

        }

        public async Task<List<Camp>> searchBooking(DateTime CheckIN, DateTime CheckOUT, int capacity)

        {

            var result = _campDbContext.Bookings.Where(x => (x.checkOut >= CheckIN && x.checkIn <= CheckOUT)).Select(x => x.campId);
            var camps = _campDbContext.Camps.Where(c => !result.Contains(c.Id) && c.Capacity >= capacity).ToList();
       
            /*   @Checkin BETWEEN b.CheckIn AND b.CheckOut OR
         @Checkout BETWEEN b.CheckIn AND b.CheckOut OR
         (@Checkin <= b.CheckIn AND @CheckOut >= b.CheckOut)*/
            return camps;
        }

        public async Task<List<Camp>> filterCamps()

        {
            var today = DateTime.Now;

            var result = _campDbContext.Bookings.Where(x => (x.checkOut >= today && x.checkIn <= today)).Select(x => x.campId);
            var camps = _campDbContext.Camps.Where(c => !result.Contains(c.Id)).ToList();
            return camps;
        }



        public async Task<Camp> getCamp([FromRoute] Guid id)
        {
            var camp = await _campDbContext.Camps.FirstOrDefaultAsync(x => x.Id == id);
            return camp;
        }

        public async Task<Camp> updateCamp([FromRoute] Guid id, Camp campRequest)
        {
            var camp = await _campDbContext.Camps.FindAsync(id);

            camp.Img = campRequest.Img;
            camp.Name = campRequest.Name;
            camp.Rate = campRequest.Rate;
            camp.Capacity = campRequest.Capacity;
            camp.Description = campRequest.Description;

            await _campDbContext.SaveChangesAsync();
            return camp;
        }

        public async Task<Camp> deleteCamp([FromRoute] Guid id)
        {
            var camp = await _campDbContext.Camps.FindAsync(id);
            _campDbContext.Camps.Remove(camp);
            await _campDbContext.SaveChangesAsync();
            return camp;
        }




        private IActionResult NotFound()
        {
            throw new NotImplementedException();
        }

        private IActionResult Ok(object camps)
        {
            throw new NotImplementedException();
        }
    }
}
