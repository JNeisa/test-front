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
        private readonly ISubjectService subjectServices;
        private readonly IMessageService messageServices;

        public ContactUsFormController(IFormService services, ISubjectService subjectServices, IMessageService messageServices)
        {
            this.services = services;
            this.subjectServices = subjectServices;
            this.messageServices = messageServices;
        }

        [HttpGet]
        public IEnumerable<Subject> Get()
        {
            return subjectServices.GetAllSubjects();
        }

        [HttpPost]
        public ActionResult Confirmation(FormDTO form)
        {
            var sForm = services.SanitizeContactUsForm(form);
            var results = services.ValidateForm(sForm);
            if (!results.IsValid)
            {
                var list = new List<ErrorResponseDTO>();
                foreach (var error in results.Errors)
                {
                    ErrorResponseDTO err = new ErrorResponseDTO
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
                var subject = subjectServices.GetSubjectByName(sForm.Subject);
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
                messageServices.SaveMessage(message);

                return Ok();
            }
        }
    }
}