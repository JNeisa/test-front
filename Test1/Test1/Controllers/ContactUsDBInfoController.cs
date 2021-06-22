using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.Contracts.Pagination;
using Test1.DB;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactUsDBInfoController : ControllerBase
    {
        private readonly IContactUsService contactUsService;
        private readonly IFormService services;
        public ContactUsDBInfoController(IContactUsService contactUsService, IFormService services)
        {
            this.contactUsService = contactUsService;
            this.services = services;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MessageToShow>> Get([FromQuery] PagingParameters pagingParameters)
        {
            var data = contactUsService.GetMessages(pagingParameters);
            var metada = new
            {
                data.CurrentPage,
                data.PageSize,
                data.TotalCount,
                data.TotalPages,
                data.HasNext,
                data.HasPrevious
            };
            Response.Headers.Add("X-pagination", JsonConvert.SerializeObject(metada));

            return Ok(data);
        }

        [HttpPost]
        public ActionResult<IEnumerable<MessageToShow>> Paginate(PagingParameters pagingParameters)
        {
            var sanitizedParameters = services.SanitizePagParam(pagingParameters);
            var data = contactUsService.GetMessages(sanitizedParameters);
            var metada = new
            {
                data.CurrentPage,
                data.PageSize,
                data.TotalCount,
                data.TotalPages,
                data.HasNext,
                data.HasPrevious
            };
            Response.Headers.Add("X-pagination", JsonConvert.SerializeObject(metada));

            return Ok(data);
        }
    }
}
