using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Services
{
    public class DBService : IDBService
    {
        private readonly ContactUsContext context;

        public DBService(ContactUsContext context)
        {
            this.context = context;
        }

        public IEnumerable<Subject> GetSubjects()
        {
            var subject = context.Subjects
                                    .ToList()
                                    .Select(x => new Subject(x.Name, x.HtmlValue)
                                    {
                                        Name = x.Name,
                                        HtmlValue = x.HtmlValue
                                    });

            return subject;
        }

        public Subject GetSubjects(string name)
        {
            var subject = context.Subjects
                                .Where(s => s.HtmlValue == name)
                                .FirstOrDefault();
            return subject;
        }

        public void SaveMessage(Message message)
        {
            context.Add<Message>(message);
            context.SaveChanges();
        }

        public IQueryable<MessageToShow> GetContactUsInfo(PagingParameters pagingParameters)
        {
            var infoFromDB = context.Messages
                .Where(m => (pagingParameters.SearchParameter != null) ? m.Email.Contains(pagingParameters.SearchParameter) || m.Subject.Name.Contains(pagingParameters.SearchParameter) : m.Email != null)
                .Include(m => m.Subject)
                .OrderBy(m => m.MessageId)
                .ToList()
                .Select(x => new MessageToShow
                {
                    Name = x.Name,
                    Userid = x.IdNumber,
                    Subject = x.Subject.Name,
                    Phone = x.Phone,
                    Email = x.Email,
                    Message = x.MsgContent,
                    CreationDate = x.CreationDate.ToString("d")
                });

            var orderedInfo = infoFromDB;
            if (pagingParameters.OrderByDate)
            {
                orderedInfo = infoFromDB.OrderBy(m => Convert.ToDateTime(m.CreationDate));
            }else if(pagingParameters.OrderBySubject){
                orderedInfo = infoFromDB.OrderBy(m => m.Subject);
            }

            return orderedInfo.AsQueryable();
        }
    }
}
