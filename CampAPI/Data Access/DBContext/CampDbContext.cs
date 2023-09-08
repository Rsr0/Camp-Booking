using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DBContext
{
    public class CampDbContext : DbContext
    {
        public CampDbContext( DbContextOptions options) : base(options)
        {
        }

        public DbSet<Camp> Camps { get; set; }
        public DbSet<Booking> Bookings { get; set; }
    }
}
