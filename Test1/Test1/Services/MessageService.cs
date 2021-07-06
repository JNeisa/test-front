using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;
using Test1.Repository;

namespace Test1.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository messageRepository;

        public MessageService(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }

        public void SaveMessage(Message message)
        {
            messageRepository.SaveMessage(message);
        }

        public int GetTotalMessageRows(PagingParametersDTO pagingParameters)
        {
            return messageRepository.GetTotalMessageRows(pagingParameters);
        }

        public IQueryable<Message> GetInfoToPagination(PagingParametersDTO pagingParameters)
        {
            return messageRepository.GetInfoToPagination(pagingParameters);
        }

        public Message GetRequestedInfo(BasicContactUsDataDTO basicData)
        {
            return messageRepository.GetRequestedInfo(basicData);
        }
    }
}
