using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TravelAppDBAccess;
using TravelApplicationWebAPI.Models;

namespace TravelApplicationWebAPI.Controllers
{
    public class RequestController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        public IEnumerable<string> Test()
        {
            return new string[] { "Success", "Connection is OK" };
        }


        // GET api/values/5
        [HttpGet]
        public Employee GetEmpolyee(string value)
        {
            using (TravelAppEntities entities = new TravelAppEntities())
            {
                return entities.Employees.FirstOrDefault(e => e.PassportNum == value);
            }

        }

        // GET api/values/5
        [HttpGet]
        public Company GetCompanyByUEN(string value)
        {
            using (TravelAppEntities entities = new TravelAppEntities())
            {
                return entities.Companies.FirstOrDefault(e => e.UEN == value);
            }
        }

        [HttpGet]
        public Company GetCompanyByName(string value)
        {
            using (TravelAppEntities entities = new TravelAppEntities())
            {
                return entities.Companies.FirstOrDefault(e => e.Name == value);
            }
        }

        [HttpGet]
        public Applicant GetApplicantByContact(string value)
        {
            using (TravelAppEntities entities = new TravelAppEntities())
            {
                return entities.Applicants.FirstOrDefault(e => e.Contact == value);
            }
        }

        [HttpGet]
        public List<Request> GetAllRequest()
        {
            using (TravelAppEntities entities = new TravelAppEntities())
            {
                return entities.Requests.ToList();
            }
        }

        [HttpPost]
        public IEnumerable<string> LoginValidation([FromBody]Admin LoginUser)
        {
            string username = LoginUser.username;
            string password = LoginUser.password;

            if (username.Equals("Admin") && password.Equals("12345"))
            {
                return new string[] { "Success", "Success" };
            }
            else
            {
                return new string[] { "Failed", "Wrong User Name or Password." };
            }


        }

        [HttpPost]
        // POST api/values
        public IEnumerable<string> InsertRequest([FromBody]RequestModel applicant_request)
        {
            Request newReuqest = new Request();

            newReuqest.CompanyUEN = applicant_request.company_UEN;
            newReuqest.ApplicantContact = applicant_request.applicant_contact;
            newReuqest.CountryDest = applicant_request.country_destination;
            newReuqest.CountryOrigin = applicant_request.country_origin;
            newReuqest.EmployeePassport = applicant_request.employee_passport;
            newReuqest.FromDate = applicant_request.request_from;
            newReuqest.ToDate = applicant_request.request_to;

            using (TravelAppEntities entities = new TravelAppEntities())
            {
                Employee existsEmployee =  entities.Employees.FirstOrDefault(a => a.PassportNum == applicant_request.employee_passport );

                if (existsEmployee == null)
                {
                    using (var context = new TravelAppEntities())
                    {
                        Employee newEmployee = new Employee();
                        newEmployee.Name = applicant_request.employee_name;
                        newEmployee.NRIC = applicant_request.employee_nric;
                        newEmployee.PassportNum = applicant_request.employee_passport;
                        context.Employees.Add(newEmployee);
                        context.SaveChanges();
                    }
                }
            }

            using (TravelAppEntities entities = new TravelAppEntities())
            {
               Applicant existsApplicant = entities.Applicants.FirstOrDefault(a => a.Contact == applicant_request.applicant_contact);

                if (existsApplicant == null)
                {
                    using (var context = new TravelAppEntities())
                    {
                        Applicant newApplicant = new Applicant();
                        newApplicant.Name = applicant_request.applicant_name;
                        newApplicant.Contact = applicant_request.applicant_contact;
                        newApplicant.Email = applicant_request.applicant_email;
                        context.Applicants.Add(newApplicant);
                        context.SaveChanges();
                    }
                }
            }

            //HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                using (var context = new TravelAppEntities())
                {
                    context.Requests.Add(newReuqest);
                    context.SaveChanges();
                }

                //response = Request.CreateResponse(
                //    HttpStatusCode.OK,
                //    new { Reply = "Request is submitted Successfully" }
                //);
                return new string[] { "Success", "Success" };
            }
            catch (Exception ex)
            {
                //response = Request.CreateResponse(
                //    HttpStatusCode.ExpectationFailed,
                //    new { Reply = "Request is submitted unsuccessfully. Error Message - " + ex.StackTrace.ToString() }
                //);
                return new string[] { "Failed", ex.StackTrace.ToString() };
            }
        }

        [HttpPut]
        // PUT api/values/5
        public void UpdateRequest(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
