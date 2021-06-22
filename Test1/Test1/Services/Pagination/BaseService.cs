using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts.Pagination;
using Test1.DB;

namespace Test1.Services.Pagination
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        protected ContactUsContext Context { get; set; }

        public BaseService(ContactUsContext context)
        {
            this.Context = context;
        }
        public IQueryable<T> GetAllInfo()
        {
            return Context.Set<T>().AsNoTracking();
        }
    }
}
