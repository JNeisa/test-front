using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.Models;

namespace Test1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactUsDetailedInfoController : ControllerBase
    {
        private readonly IDataToShowService dataToShowServices;
        public ContactUsDetailedInfoController(IDataToShowService dataToShowServices)
        {
            this.dataToShowServices = dataToShowServices;
        }

        [HttpPost]
        public DetailedContactUsDataDTO GetDetailedData(BasicContactUsDataDTO basicData)
        {
            return dataToShowServices.GetDetailedData(basicData);
        }
    }
}
