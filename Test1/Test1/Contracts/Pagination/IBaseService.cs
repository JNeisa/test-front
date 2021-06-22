using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test1.Contracts.Pagination
{
    public interface IBaseService<T>
    {
        IQueryable<T> GetAllInfo();
    }
}
