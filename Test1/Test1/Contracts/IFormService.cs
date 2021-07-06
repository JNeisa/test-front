using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Models;
using Test1.Models.Pagination;

namespace Test1.Contracts
{
    public interface IFormService
    {
        ValidationResult ValidateForm(FormDTO form);
        FormDTO SanitizeContactUsForm(FormDTO contactUsForm);
        PagingParametersDTO SanitizePagParam(PagingParametersDTO pagingParameters);
    }
}
