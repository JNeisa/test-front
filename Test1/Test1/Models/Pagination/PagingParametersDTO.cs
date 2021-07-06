using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test1.Models.Pagination
{
    public class PagingParametersDTO
    {
        const int maxPageSize = 100;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                //Operador ? => condition ? consequent : alternative
                _pageSize = (value > maxPageSize) ? maxPageSize : (value <= 0) ? _pageSize : value;
            }
        }
        public string SearchParameter { get; set; }
        public bool OrderByDate { get; set; } = false;
        public bool OrderBySubject { get; set; } = false;
    }
}
