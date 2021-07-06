using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Services
{
    public class DataToShowService : IDataToShowService
    {
        private readonly IMessageService messageServices;
        public DataToShowService(IMessageService messageServices)
        {
            this.messageServices = messageServices;
        }

        public PagedListDTO<BasicContactUsDataDTO> GetBasicInfo(PagingParametersDTO pagingParameters)
        {
            var data = messageServices.GetInfoToPagination(pagingParameters);

            if (data.Any()){
                var infoToShow = data.Select(x => new BasicContactUsDataDTO
                {
                    Name = x.Name,
                    Subject = x.Subject.Name,
                    Email = x.Email,
                    CreationDate = x.CreationDate.ToString("d")
                });

                return new PagedListDTO<BasicContactUsDataDTO>(infoToShow.ToList(), messageServices.GetTotalMessageRows(pagingParameters), pagingParameters.PageNumber, pagingParameters.PageSize);
            }
            else
            {
                var nullList = new List<BasicContactUsDataDTO>();
                var errorMsg = new BasicContactUsDataDTO
                {
                    Name = null,
                    Subject = null,
                    Email = null,
                    CreationDate = null
                };
                nullList.Add(errorMsg);

                return new PagedListDTO<BasicContactUsDataDTO>(nullList, 0, 0, 0);
            }
        }
        public DetailedContactUsDataDTO GetDetailedData(BasicContactUsDataDTO basicData)
        {
            var data = messageServices.GetRequestedInfo(basicData);
            var detailedData = new DetailedContactUsDataDTO
            {
                Name = data.Name,
                Userid = data.IdNumber,
                Subject = data.Subject.HtmlValue,
                Phone = data.Phone,
                Email = data.Email,
                Message = data.MsgContent,
                CreationDate = data.CreationDate.ToString("d")
            };

            return detailedData;
        }
    }
}
