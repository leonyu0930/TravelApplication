using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelApplicationWebAPI.Models
{
    public class RequestModel
    {
        public string company_name { get; set; }

        public string company_address { get; set; }

        public string company_UEN { get; set; }

        public string applicant_name { get; set; }

        public string applicant_contact { get; set; }

        public string applicant_email { get; set; }

        public string employee_name { get; set; }

        public string employee_nric{ get; set; }

        public string employee_passport { get; set; }

        public string country_origin { get; set; }

        public string country_destination { get; set; }

        public DateTime request_from { get; set; }
        
        public DateTime request_to { get; set; }
    }
}