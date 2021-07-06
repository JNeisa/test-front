using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test1.Models
{
    public class DetailedContactUsDataDTO
    {
        public string Name { get; set; }
        public long Userid { get; set; }
        public string Subject { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string CreationDate { get; set; }
    }
}
