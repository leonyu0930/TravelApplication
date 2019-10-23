
class DashBoardTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }

    componentDidMount() {
        fetch('http://localhost/TravelAppWebAPI/api/Request/GetAllRequest',
            {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                //this.setState({ data })
                console.log(data);
                this.setState({ tableData: data})
            });
    }

    renderTableData() {
        return this.state.tableData.map((request, index) => {
            const {
                RequestID,
                CompanyUEN,
                ApplicantContact,
                EmployeePassport,
                CountryOrigin,
                CountryDest,
                FromDate,
                ToDate
            } = request //destructuring
            return (
                <tr key={RequestID}>
                    <td>{RequestID}</td>
                    <td>{CompanyUEN}</td>
                    <td>{ApplicantContact}</td>
                    <td>{EmployeePassport}</td>
                    <td>{CountryOrigin}</td>
                    <td>{CountryDest}</td>
                    <td>{moment(FromDate).format("DD-MMM-YYYY")}</td>
                    <td>{moment(ToDate).format("DD-MMM-YYYY")}</td>
                    <td>Pending</td>
                    <td><input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="container col-md-10">
                        <div className="card card-register mx-auto mt-5">
                            <div className="card-header"><h4>Application Dashboard</h4></div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Req ID</th>
                                            <th scope="col">UEN</th>
                                            <th scope="col">Applicant Contact No.</th>
                                            <th scope="col">Employee Passport No.</th>
                                            <th scope="col">Country of Origin</th>
                                            <th scope="col">Country of Destination</th>
                                            <th scope="col">From Date</th>
                                            <th scope="col">To Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Cost(S$)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <DashBoardTable />,
    document.getElementById('dashboardTable')

)