using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test1.DB
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Name { get; set; }
        public long IdNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string MsgContent { get; set; }
        [Column(TypeName="date")]
        public DateTime CreationDate { get; set; }

        public Subject Subject { get; set; }
        public int SubjectId { get; set; }
        
    }
}