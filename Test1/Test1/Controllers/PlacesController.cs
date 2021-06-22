using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.Models;

namespace Test1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlacesController: ControllerBase
    {
        [HttpGet]
        public IEnumerable<Place> Get() 
        {
            var places = new List<Place>
            {
                new Place
                {
                    Name = "Oficina Principal Facatativa",
                    Address = "Carrera 3 No. 4-60",
                    Pbx = 8923232,
                    Schedule = "Lunes a viernes de 8:00 am a 12:15 pm - 2:00 pm a 5:30 pm."
                },

                new Place
                {
                    Name = "Centro de Atención Villeta",
                    Address = "Calle 4 No. 4-39",
                    Pbx = 8446306,
                    Phone = 3212361299,
                    Schedule = "Lunes a viernes de 8:00 am a 12:15 pm - 2:00 pm a 5:30 pm."
                },
                new Place
                {
                    Name = "Centro de atención Funza",
                    Address = "Calle 14 N° 15-08 C.C. Bancolombia Márquez Plaza Local No. 2, 3 y 4",
                    Pbx = 8266530,
                    Phone = 3125880110,
                    Schedule = "Lunes a viernes de 8:00 am a 12:15 pm - 2:00 pm a 5:30 pm."
                },
                new Place
                {
                    Name = "Centro de Atención Pacho",
                    Address = "Carrera 15 N° 7 - 08",
                    Pbx = 8542131,
                    Phone = 3125880096,
                    Schedule = "Lunes a viernes de 8:00 am a 12:15 pm - 2:00 pm a 5:30 pm."
                }
            };
            return places;
        }
    }
}
