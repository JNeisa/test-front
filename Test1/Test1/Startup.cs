using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Test1.Contracts;
using Test1.DB;
using Test1.Repository;
using Test1.Services;
using Test1.Validators;

namespace Test1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<ISubjectRepository, SubjectRepository>();
            services.AddTransient<IMessageRepository, MessageRepository>();
            services.AddScoped<IFormService, FormService>();
            services.AddScoped<ISubjectService, SubjectService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IDataToShowService, DataToShowService>();
            services.AddCors(options =>
            {
                options.AddPolicy("localhost", builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
            services.AddControllers();
            services.AddMvc()
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.SuppressModelStateInvalidFilter = true;
                })
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<FormValidator>());
            services.AddDbContext<ContactUsContext>(options => 
                options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("localhost");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
