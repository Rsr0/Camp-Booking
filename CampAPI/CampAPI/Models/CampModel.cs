using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampAPI.Models
{
    public class CampModel
    {
        public Guid Id { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public long Rate { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; }

    }
}
