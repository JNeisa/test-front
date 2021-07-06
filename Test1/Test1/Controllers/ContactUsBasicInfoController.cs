using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactUsBasicInfoController : ControllerBase
    {
        private readonly IDataToShowService dataToShowService;
        private readonly IFormService services;
        public ContactUsBasicInfoController(IDataToShowService dataToShowService, IFormService services)
        {
            this.dataToShowService = dataToShowService;
            this.services = services;
        }

        [HttpPost]
        public PagedListDTO<BasicContactUsDataDTO> Paginate(PagingParametersDTO pagingParameters)
        {
            var sanitizedParameters = services.SanitizePagParam(pagingParameters);
            var data = dataToShowService.GetBasicInfo(sanitizedParameters);

            return data;
        }
    }
}
