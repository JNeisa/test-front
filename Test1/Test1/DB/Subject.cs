using System.Collections.Generic;

namespace Test1.DB
{
    public class Subject
    {
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public string HtmlValue { get; set; }

        public ICollection<Message> Messages { get; set; }

        public Subject(string name, string htmlValue)
        {
            Name = name;
            HtmlValue = htmlValue;
        }
    }
}