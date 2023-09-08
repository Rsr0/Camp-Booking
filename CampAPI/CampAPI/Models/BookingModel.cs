using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CampAPI.Models
{
    public class BookingModel
    {
       
        [Key]
        public string brn { get; set; }

        public Guid campId { get; set; }
        public DateTime checkIn { get; set; }
        public DateTime checkOut { get; set; }
        public int capacity { get; set; }

        public long nights { get; set; }
        public long amount { get; set; }
        public string address { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public long zip { get; set; }
        public long phone { get; set; }
    }
}
