using FluentValidation;
using FluentValidation.Results;
using Ganss.XSS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.DB;
using Test1.Models;
using Test1.Services;
using Test1.Validators;

namespace Test1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactUsFormController : ControllerBase
    {
        private readonly IFormService services;
        private readonly IDBService servicesDB;

        public ContactUsFormController(IFormService services, IDBService servicesDB)
        {
            this.services = services;
            this.servicesDB = servicesDB;
        }

        [HttpGet]
        public IEnumerable<Subject> Get()
        {
            var subjects = servicesDB.GetSubjects();
            return subjects;
        }

        [HttpPost]
        public ActionResult Confirmation(Form form)
        {
            var sForm = services.SanitizeContactUsForm(form);
            var results = services.ValidateForm(sForm);
            if (!results.IsValid)
            {
                var list = new List<ErrorResponse>();
                foreach (var error in results.Errors)
                {
                    ErrorResponse err = new ErrorResponse
                    {
                        ErrorName = error.PropertyName,
                        ErrorDesc = error.ErrorMessage
                    };
                    list.Add(err);
                }
                return BadRequest(list);
            }
            else
            {
                var subject = servicesDB.GetSubjects(sForm.Subject);
                DateTime date = DateTime.Now;

                var message = new Message()
                {
                    Name = sForm.Name,
                    IdNumber = sForm.Userid,
                    Phone = sForm.Phone,
                    Email = sForm.Email,
                    MsgContent = sForm.Message,
                    Subject = subject,
                    CreationDate = date
                };
                servicesDB.SaveMessage(message);

                return Ok();
            }
        }
    }
}