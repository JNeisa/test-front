using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.Contracts.Pagination;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Services.Pagination
{
    public class ContactUsService : IContactUsService
    {
        private readonly IDBService servicesDB;
        public ContactUsService(IDBService servicesDB)
        {
            this.servicesDB = servicesDB;
        }
        //Task<T> puede devolver un valor, generalmente se ejecuta de forma asíncrona
        public PagedList<MessageToShow> GetMessages(PagingParameters pagingParameters)
        {
            return PagedList<MessageToShow>.GetPagedList(servicesDB.GetContactUsInfo(pagingParameters),
                pagingParameters.PageNumber, 
                pagingParameters.PageSize);
        }
    }
}
