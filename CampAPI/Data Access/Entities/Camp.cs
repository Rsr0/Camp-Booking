using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Camp
    {
        public Guid Id { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public long Rate { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; }

    }
}
