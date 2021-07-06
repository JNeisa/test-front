using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.DB;

namespace Test1.Repository
{
    public interface ISubjectRepository : IRepository<Subject>
    {
        IEnumerable<Subject> GetAllSubjects();
        Subject GetSubjectByName(string name);
    }
}
