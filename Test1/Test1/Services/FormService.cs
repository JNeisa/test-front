using FluentValidation.Results;
using Ganss.XSS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.Models;
using Test1.Models.Pagination;
using Test1.Validators;

namespace Test1.Services
{
    public class FormService : IFormService
    {
        public ValidationResult ValidateForm(Form form)
        {
            // Establezco las variables
            var sanitizer = new HtmlSanitizer();
            sanitizer.AllowedTags.Remove("img");
            FormValidator validator = new FormValidator();

            // Valido la info entrante
            return validator.Validate(form);
        }
        public Form SanitizeContactUsForm(Form contactUsForm)
        {
            // Establezco las variables
            var sanitizer = new HtmlSanitizer();

            // Sanitizo la entrada de texto --textField--
            var sanitized = sanitizer.Sanitize(contactUsForm.Message);
            contactUsForm.Message = sanitized;

            var sanitizedForm = contactUsForm;

            return sanitizedForm;
        }

        public PagingParameters SanitizePagParam(PagingParameters pagingParameters)
        {
            var sanitizer = new HtmlSanitizer();

            var varSanitized = (pagingParameters.SearchParameter != null) ? sanitizer.Sanitize(pagingParameters.SearchParameter) : null;
            pagingParameters.SearchParameter = varSanitized;

            return pagingParameters;
        }
    }
}
