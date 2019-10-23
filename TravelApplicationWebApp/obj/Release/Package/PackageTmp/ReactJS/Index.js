const formValid = ({ formErrors, ...rest }) => {
    let valid = false;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const contact = RegExp(
    /^[0-9-]+$/
);

const passpordNRIC = RegExp(
    /^[a-zA-Z0-9]+$/
);

const checkName = RegExp(
    /^[a-zA-Z@' ]+$/
);

class ApplicationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            company_name: null,
            company_address: "",
            company_UEN: "",
            applicant_name: null,
            applicant_contact: null,
            applicant_email: null,
            employee_name: "",
            employee_id: "",
            employee_passport: null,
            employee_country_origin: null,
            employee_country_destination: null,
            employee_from_date: null,
            employee_to_date: null,
            preview_display_style: 'none',
            preview_content: "",
            missing_error: "",
            continue_btn_disabled: "",
            submit_btn_disabled: "",
            submit_error: "",

            formErrors: {
                company_name: null,
                company_address: null,
                applicant_name: null,
                applicant_contact: null,
                applicant_email: null,
                employee_name: null,
                employee_id: null,
                employee_passport: null,
                employee_country_origin: null,
                employee_country_destination: null,
                employee_from_date: null,
                employee_to_date: null,
            },
        };
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "company_name":
                formErrors.company_name =
                    value == null ? ""
                        : value.length == 0 ? "Name of Company is required"
                            : value.length < 3 ? "Minimum 3 characaters required"
                                : "";
                break;
            case "company_address":
                formErrors.company_address =
                    value == null ? ""
                        : value.length == 0 ? "Address of Company is required"
                            : value.length < 3 ? "Minimum 3 characaters required"
                                : "";
                break;
            case "applicant_name":
                formErrors.applicant_name = value == null ? ""
                    : value.length == 0 ? "Name of Applicant is required"
                        : checkName.test(value) ? value.length < 3
                            ? "Minimum 3 characaters required" : ""
                                : "Invalid Name";
                break;
            case "applicant_contact":
                formErrors.applicant_contact = value == null ? ""
                    : value.length == 0 ? "Contact of Applicant is required"
                        : contact.test(value) ? value.length < 8
                            ? "Minimum 8 characaters required" : ""
                                : "Invalid contact";
                break;
            case "applicant_email":
                formErrors.applicant_email = value == null ? ""
                    : value.length == 0 ? "Email of Applicant is required"
                        : emailRegex.test(value) ? ""
                            : "Invalid email address";
                break;
            case "employee_name":
                formErrors.employee_name = value == null ? ""
                    : value.length == 0 ? "Name of Employee is required"
                        : checkName.test(value) ? value.length < 3
                            ? "Minimum 3 characaters required" : ""
                                : "Invalid Name";
                break;
            case "employee_id":
                formErrors.employee_id = value == null ? ""
                    : passpordNRIC.test(value) ? ""
                        : "Invalid NRIC";
                break;
            case "employee_passport":
                formErrors.employee_passport = value == null ? ""
                    : value.length == 0 ? "Passport Number of Employee is required"
                        : passpordNRIC.test(value) ? ""
                            : "Invalid Passport";
                break;
            case "employee_country_origin":
                formErrors.employee_country_origin = value.length == 0 ? "Country of Origin is required"
                    : value.length > 0 ? ""
                        : formErrors.employee_country_origin
                break;
            case "employee_country_destination":
                formErrors.employee_country_destination = value.length == 0 ? "Country of Destination is required"
                    : value.length > 0 ? ""
                        : formErrors.employee_country_destination
                break;
            case "employee_from_date":
                formErrors.employee_from_date = value.length == 0 ? "From Date is required"
                    : value.length > 0 ? ""
                        : formErrors.employee_from_date
                break;
            case "employee_to_date":
                formErrors.employee_to_date = value.length == 0 ? "To Date is required"
                    : value.length > 0 ? ""
                        : formErrors.employee_to_date
                break;
            default:
                break;
        }



        if (name == "company_name") {
            if (value.length == 0) {
                this.state.company_UEN = "";
            } else {
                fetch('http://localhost/TravelAppWebAPI/api/Request/GetCompanyByName?value=' + value,
                    {
                        method: "GET"
                    })
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if (data != null) {
                            var UEN_val = data.UEN;
                            var Address_val = data.Address;

                            if (UEN_val != null && UEN_val.length > 0) {
                                this.setState({ company_UEN: UEN_val });
                            }

                            if (Address_val != null && Address_val.length > 0) {
                                this.setState({ company_address: Address_val });
                                formErrors.company_address = "";
                            }
                        } else {
                            this.setState({ company_UEN: "" });
                            this.setState({ company_address: "" });
                        }
                    });
            }
        }

        if (name == "employee_passport") {
            if (value.length != 0) {
                fetch('http://localhost/TravelAppWebAPI/api/Request/GetEmpolyee?value=' + value,
                    {
                        method: "GET"
                    })
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if (data != null) {
                            var employeeName = data.Name;
                            var employeeNRIC = data.NRIC;
                            if (employeeName != null && employeeName.length > 0) {
                                this.setState({ employee_name: employeeName });
                                formErrors.employee_name = "";
                            }

                            if (employeeNRIC != null && employeeNRIC.length > 0) {
                                this.setState({ employee_id: employeeNRIC });
                                formErrors.employee_id = "";
                            }
                        }
                    });
            }
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const data = this.state
        //console.log(this.inputFullNameRef.current.value)

        //if (formValid(this.state)) {
        //    console.log("Final data is", data)
        //    //setStyles(application_preview_block.)
        //} else {
        //    console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        //}
        fetch('http://localhost/TravelAppWebAPI/api/Request/InsertRequest',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    company_name: this.state.company_name,
                    company_address: this.state.company_address,
                    company_UEN: this.state.company_UEN.length > 0 ? this.state.company_UEN : "N.A.",
                    applicant_name: this.state.applicant_name,
                    applicant_contact: this.state.applicant_contact,
                    applicant_email: this.state.applicant_email,
                    employee_name: this.state.employee_name,
                    employee_nric: this.state.employee_id.length > 0 ? this.state.employee_id: "",
                    employee_passport: this.state.employee_passport,
                    country_origin: this.state.employee_country_origin,
                    country_destination: this.state.employee_country_destination,
                    request_from: this.state.employee_from_date,
                    request_to: this.state.employee_to_date
				})
            })
            .then(response => {
                return response.json();
            }).then(data => {
                //if (data[0] == this.state.username) {
                var compare = data[0] == "Success"
                if (compare) {
                    this.setState({ submit_error: '' });
                    console.log(data);
                    window.location.replace("./Index.html");
                } else {
                    return this.setState({ submit_error: data[1] });
                }

            });
    }

    handleClick = (event) => {
        event.preventDefault()

        console.log("Continue")

        const { name, value } = event.target;
        let formErrors = { ...this.state.formErrors };


        if (!this.state.company_name) {
            formErrors.company_name = "Name of Company is required";
            //this.setState({ Company_Name_Class: "form-control col-md-6 is-invalid" });
        }

        if (!this.state.company_address) {
            formErrors.company_address = "Address of Company is required";
        }

        if (!this.state.applicant_name) {
            formErrors.applicant_name = "Name of Applicant is required";
        }

        if (!this.state.applicant_contact) {
            formErrors.applicant_contact = "Contact of Applicant is required";
        }

        if (!this.state.applicant_email) {
            formErrors.applicant_email = "Email of Applicant is required";
        }

        if (!this.state.employee_name) {
            formErrors.employee_name = "Name of Employee is required";
        }

        if (!this.state.employee_passport) {
            formErrors.employee_passport = "Passport Number of Employee is required";
        }

        if (!this.state.employee_country_origin) {
            formErrors.employee_country_origin = "Country of Origin is required";
        }

        if (!this.state.employee_country_destination) {
            formErrors.employee_country_destination = "Country of Destination is required";
        }

        if (!this.state.employee_from_date) {
            formErrors.employee_from_date = "From Date is required";
        }

        if (!this.state.employee_to_date) {
            formErrors.employee_to_date = "To Date is required";
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));

        if (!formErrors.company_name.length > 0
            && !formErrors.company_address.length > 0
            && !formErrors.applicant_name.length > 0
            && !formErrors.applicant_contact.length > 0
            && !formErrors.applicant_email.length > 0
            && !formErrors.employee_name.length > 0
            && (formErrors.employee_id == null || !formErrors.employee_id.length > 0)
            && !formErrors.employee_passport.length > 0
            && !formErrors.employee_country_origin.length > 0
            && !formErrors.employee_country_destination.length > 0
            && !formErrors.employee_from_date.length > 0
            && !formErrors.employee_to_date > 0) {

            this.setState({
                preview_display_style: "block",
                continue_btn_disabled: "disabled"
            });
        } else {
            console.log("Form Validation Failed!");
        }
    }

    render() {
        const styles = {
            PreviewBlockStyle: {
                display: this.state.preview_display_style,
            }
        };
        const { formErrors } = this.state;
        const { PreviewBlockStyle } = styles;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="container col-md-6">
                            <div className="card card-register mx-auto mt-5">
                                <div className="card-header"><h4>Travel Application Form</h4> (* denotes mandatory fields) </div>
                                <div className="card-body">
                                    <div>
                                        <h6 className="card-subtitle mb-2 text-uppercase">Company Details</h6>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Name of Company*</label>
                                            <input type='text' className={formErrors.company_name == null ? "form-control col-md-6" : formErrors.company_name.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="company_name" noValidate onChange={this.handleChange} placeholder="Name of Company" />
                                            {formErrors.company_name!=null && formErrors.company_name.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.company_name}</small>
                                            )}
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Address of Company*</label>
                                            <input type='text' className={formErrors.company_address == null ? "form-control col-md-6" : formErrors.company_address.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.state.company_address} name="company_address" noValidate onChange={this.handleChange} placeholder="Address of Company" />
                                            {formErrors.company_address != null && formErrors.company_address.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.company_address}</small>
                                            )}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Unique entity number (UEN) of company</label>
                                            <input type='text' className="form-control col-md-6" value={this.state.company_UEN} name="company_UEN" readOnly />
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="card-subtitle mb-2 text-uppercase">Applicant Details</h6>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Name of Applicant*</label>
                                            <input type='text' className={formErrors.applicant_name == null ? "form-control col-md-6" : formErrors.applicant_name.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="applicant_name" noValidate onChange={this.handleChange} placeholder="Name of Application" />
                                            {formErrors.applicant_name != null && formErrors.applicant_name.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.applicant_name}</small>
                                            )}
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Contact of Applicant*</label>
                                            <input type='text' className={formErrors.applicant_contact == null ? "form-control col-md-6" : formErrors.applicant_contact.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="applicant_contact" noValidate onChange={this.handleChange} />
                                            {formErrors.applicant_contact != null && formErrors.applicant_contact.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.applicant_contact}</small>
                                            )}
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Email of Applicant*</label>
                                            <input type='email' className={formErrors.applicant_email == null ? "form-control col-md-6" : formErrors.applicant_email.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="applicant_email" noValidate onChange={this.handleChange} placeholder="name@example.com" />
                                            <small id="emailHelp" className="form-text col-md-10 text-muted text-right">We'll never share your email with anyone else.</small>
                                            {formErrors.applicant_email != null && formErrors.applicant_email.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.applicant_email}</small>
                                            )}
                                        </div>

                                    </div>
                                    <div>
                                        <h6 className="card-subtitle mb-2 text-uppercase">Employee (traveller) Details</h6>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Name of Emlopyee*</label>
                                            <input type='text' className={formErrors.employee_name == null ? "form-control col-md-6" : formErrors.employee_name.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} placeholder='Name of Emlopyee' value={this.state.employee_name} name="employee_name" noValidate onChange={this.handleChange} />
                                            {formErrors.employee_name != null && formErrors.employee_name.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_name}</small>
                                            )}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">NRIC/FIN</label>
                                            <input type='text' className={formErrors.employee_id == null ? "form-control col-md-6" : formErrors.employee_id.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.state.employee_id} name="employee_id" noValidate onChange={this.handleChange} />
                                            {formErrors.employee_id != null && formErrors.employee_id.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_id}</small>
                                            )}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Passport No.*</label>
                                            <input type='text' className={formErrors.employee_passport == null ? "form-control col-md-6" : formErrors.employee_passport.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="employee_passport" noValidate onChange={this.handleChange} />
                                            {formErrors.employee_passport != null && formErrors.employee_passport.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_passport}</small>
                                            )}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Country of Origin*</label>
                                            <input type='text' className={formErrors.employee_country_origin == null ? "form-control col-md-6" : formErrors.employee_country_origin.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="employee_country_origin" noValidate onChange={this.handleChange}/>
                                            {formErrors.employee_country_origin != null && formErrors.employee_country_origin.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_country_origin}</small>
                                            )}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Country of Destination*</label>
                                            <input type='text' className={formErrors.employee_country_destination == null ? "form-control col-md-6" : formErrors.employee_country_destination.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="employee_country_destination" noValidate onChange={this.handleChange}/>
                                            {formErrors.employee_country_destination != null && formErrors.employee_country_destination.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_country_destination}</small>
                                            )}
                                        </div>

                                        <h6 className="card-subtitle mb-2 text-uppercase">Travel Period</h6>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">From</label>
                                            <input type='date' className={formErrors.employee_from_date == null ? "form-control col-md-6" : formErrors.employee_from_date.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="employee_from_date" noValidate onChange={this.handleChange}/>
                                            {formErrors.employee_from_date != null && formErrors.employee_from_date.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_from_date}</small>
                                            )}
                                            <label className="col-sm-4 col-form-label">To</label>
                                            <input type='date' className={formErrors.employee_to_date == null ? "form-control col-md-6" : formErrors.employee_to_date.length > 0 ? "form-control col-md-6 is-invalid" : "form-control col-md-6 is-valid"} value={this.props.value} name="employee_to_date" noValidate onChange={this.handleChange}/>
                                            {formErrors.employee_to_date != null && formErrors.employee_to_date.length > 0 && (
                                                <small className="form-text col-md-10 text-danger text-right">{formErrors.employee_to_date}</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <input className="btn btn-primary" type="button" value="Continue..." onClick={this.handleClick} disabled={this.state.continue_btn_disabled.length > 0} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container col-md-6" style={PreviewBlockStyle}>
                            <div className="card card-register mx-auto mt-5">
                                <div className="card-header">Preview</div>
                                <div className="card-body">
                                    {
                                        this.state.submit_error.length > 0 && (
                                            <div>
                                                <div className="alert alert-danger">
                                                    {this.state.submit_error}
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div>
                                        <div className="form-group row"><h5>=====Company Details=====</h5></div>
                                        <div className="form-group row"><b>Name of Comany</b>: {this.state.company_name}</div>
                                        <div className="form-group row"><b>Address of Company</b>: {this.state.company_address}</div>
                                        <div className="form-group row"><b>Unique entity number (UEN) of company</b>: {this.state.company_UEN == null ? "" : this.state.company_UEN}</div>
                                        {"\n"}
                                        <div className="form-group row"><h5>=====Applicant Details=====</h5></div>
                                            <div className="form-group row"><b>Name of Applicant</b>: {this.state.applicant_name}</div>
                                        <div className="form-group row"><b>Contact of Applicant</b>: {this.state.applicant_contact}</div>
                                        <div className="form-group row"><b>Email of Applicant</b>: {this.state.applicant_email}</div>
                                        <div className="form-group row"><h5>=====Empolyee Details=====</h5></div>
                                        <div className="form-group row"><b>Name of Employee</b>: {this.state.employee_name}</div>
                                        <div className="form-group row"><b>NRIC/FIN</b>: {this.state.employee_id == null ? "" : this.state.employee_id}</div>
                                        <div className="form-group row"><b>Passport No.</b>: {this.state.employee_passport}</div>
                                        <div className="form-group row"><b>Country of Origin</b>: {this.state.employee_country_origin}</div>
                                        <div className="form-group row"><b>Country of Destination</b>: {this.state.employee_country_destination}</div>
                                        <div className="form-group row"><b>Travel From</b> &nbsp;{this.state.employee_from_date} <b> &nbsp; To &nbsp; </b> {this.state.employee_to_date}</div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <input className="btn btn-primary" type="submit" value="Submit" disabled={(formErrors.company_name != null && formErrors.company_name.length > 0) ||
                                (formErrors.company_address != null && formErrors.company_address.length > 0) ||
                                (formErrors.applicant_name != null && formErrors.applicant_name.length > 0) ||
                                (formErrors.applicant_contact != null && formErrors.applicant_contact.length > 0) ||
                                (formErrors.applicant_email != null && formErrors.applicant_email.length > 0) ||
                                (formErrors.employee_name != null && formErrors.employee_name.length > 0) ||
                                (formErrors.employee_id != null && formErrors.employee_id.length > 0) ||
                                (formErrors.employee_passport != null && formErrors.employee_passport.length > 0) ||
                                (formErrors.employee_country_origin != null && formErrors.employee_country_origin.length > 0) ||
                                (formErrors.employee_country_destination != null && formErrors.employee_country_destination.length > 0) ||
                                (formErrors.employee_from_date != null && formErrors.employee_from_date.length > 0) ||
                                (formErrors.employee_to_date != null && formErrors.employee_to_date.length > 0)} />
                                        &nbsp;&nbsp;&nbsp;<a href="./Index.html" className="btn btn-danger" role="button">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div >
        )
    }
}

ReactDOM.render(
    <ApplicationForm />,
    document.getElementById('form_details')

)

//export default ApplicationForm