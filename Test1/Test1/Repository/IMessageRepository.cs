using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Repository
{
    public interface IMessageRepository : IRepository<Message>
    {
        IQueryable<Message> GetInfoToPagination(PagingParametersDTO pagingParameters);
        Message GetRequestedInfo(BasicContactUsDataDTO basicData);
        int GetTotalMessageRows(PagingParametersDTO pagingParameters);
        void SaveMessage(Message message);
    }
}
