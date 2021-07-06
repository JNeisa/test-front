using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Repository
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(ContactUsContext repositoryContext) : base(repositoryContext)
        {

        }

        public IQueryable<Message> GetInfoToPagination(PagingParametersDTO pagingParameters)
        {
            var messages = GetAll()
                .Where(m => (pagingParameters.SearchParameter != null) ? m.Email.Contains(pagingParameters.SearchParameter) || m.Subject.Name.Contains(pagingParameters.SearchParameter) : m.Email != null)
                .Include(m => m.Subject).AsQueryable();

            if (pagingParameters.OrderByDate)
            {
                messages = messages.OrderBy(m => m.CreationDate)
                    .Skip((pagingParameters.PageNumber - 1) * pagingParameters.PageSize)
                    .Take(pagingParameters.PageSize);
            }
            else if (pagingParameters.OrderBySubject)
            {
                messages = messages.OrderBy(m => m.Subject.Name)
                    .Skip((pagingParameters.PageNumber - 1) * pagingParameters.PageSize)
                    .Take(pagingParameters.PageSize);
            }
            else
            {
                messages = messages.OrderBy(m => m.MessageId)
                    .Skip((pagingParameters.PageNumber - 1) * pagingParameters.PageSize)
                    .Take(pagingParameters.PageSize);
            }

            return messages;
        }

        public Message GetRequestedInfo(BasicContactUsDataDTO basicData)
        {
            return GetAll()
                .Where(x => (x.Name == basicData.Name) && (x.Email == basicData.Email) && (x.Subject.Name == basicData.Subject) && (x.CreationDate == Convert.ToDateTime(basicData.CreationDate)))
                .Include(x => x.Subject)
                .FirstOrDefault();
        }

        public int GetTotalMessageRows(PagingParametersDTO pagingParameters)
        {
            var totalRows = GetAll()
                .Where(x => (pagingParameters.SearchParameter != null) ? x.Email.Contains(pagingParameters.SearchParameter) || x.Subject.Name.Contains(pagingParameters.SearchParameter) : x.Email != null)
                .Count();


            return totalRows;
        }

        public void SaveMessage(Message message)
        {
            AddEntity(message);
        }
    }
}
