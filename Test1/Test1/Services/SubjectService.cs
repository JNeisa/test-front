using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.DB;
using Test1.Repository;

namespace Test1.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository subjectRepository;

        public SubjectService(ISubjectRepository subjectRepository)
        {
            this.subjectRepository = subjectRepository;
        }

        public IEnumerable<Subject> GetAllSubjects()
        {
            return subjectRepository.GetAllSubjects();
        }

        public Subject GetSubjectByName(string name)
        {
            return subjectRepository.GetSubjectByName(name);
        }
    }
}
