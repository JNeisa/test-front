using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Models;

namespace Test1.Validators
{
    public class FormValidator : AbstractValidator<Form>
    {
        public FormValidator()
        {
            RuleFor(form => form.Name)
                .NotEmpty().WithMessage("El campo es obligatorio.")
                .Matches(@"^[a-zA-Z\s]{1,20}$").WithMessage("Formato invalido.");
            RuleFor(form => form.Userid.ToString())
                .NotEmpty().WithMessage("El campo es obligatorio.")
                .Matches("^[0-9]{1,20}$").WithMessage("Formato invalido.");
            RuleFor(form => form.Subject)
                .NotEqual("opt0").WithMessage("Opción invalida");
            RuleFor(form => form.Phone)
                .NotEmpty().WithMessage("El campo es obligatorio.")
                .Matches(@"^\+?[0-9]{2,20}$").WithMessage("Formato invalido.");
            RuleFor(form => form.Email)
                .EmailAddress().WithMessage("No es una dirección de correo electronico válida.");
            RuleFor(form => form.Message)
                .NotEmpty().WithMessage("El campo es obligatorio.");
        }
    }
}
