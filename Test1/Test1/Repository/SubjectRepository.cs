using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.DB;

namespace Test1.Repository
{
    public class SubjectRepository : Repository<Subject>, ISubjectRepository
    {
        public SubjectRepository(ContactUsContext repositoryContext) : base(repositoryContext)
        {

        }

        public IEnumerable<Subject> GetAllSubjects()
        {
            return GetAll()
                    .OrderBy(x => x.SubjectId)
                    .ToList()
                    .Select(x => new Subject(x.Name, x.HtmlValue) 
                    {
                        Name = x.Name,
                        HtmlValue = x.HtmlValue
                    });
        }

        public Subject GetSubjectByName(string name)
        {
            var subject = GetAll()
                            .Where(x => x.HtmlValue == name)
                            .FirstOrDefault();
            return subject;
        }
    }
}
