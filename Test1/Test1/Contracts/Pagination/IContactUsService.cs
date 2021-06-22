using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Contracts.Pagination
{
    public interface IContactUsService
    {
        PagedList<MessageToShow> GetMessages(PagingParameters pagingParameters);
    }
}
