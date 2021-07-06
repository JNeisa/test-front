using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Contracts
{
    public interface IDataToShowService
    {
        PagedListDTO<BasicContactUsDataDTO> GetBasicInfo(PagingParametersDTO pagingParameters);
        DetailedContactUsDataDTO GetDetailedData(BasicContactUsDataDTO basicData);
    }
}
