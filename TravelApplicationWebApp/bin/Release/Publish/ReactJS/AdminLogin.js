class LoginFrom extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }


        fetch('http://localhost/TravelAppWebAPI/api/Request/LoginValidation',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
            })
            .then(response => {
                return response.json();
            }).then(data => {
                //if (data[0] == this.state.username) {
                var compare = data[0] == "Success"
                if (compare) {
                    this.setState({ error: '' });
                    console.log(data);
                    window.location.replace("./Index.html");
                } else {
                    return this.setState({ error: data[1] });
                }

            });

    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error.length > 0 && (
                            <div>
                                <div className="alert alert-danger">
                                    {this.state.error}
                                </div>
                            </div>
                        )
                    }

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">User Name</label>
                        <input type="text" className="form-control col-md-5" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Password</label>
                        <input type="password" className="form-control col-md-5" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
                    </div>
                    <div className="col-md-12 text-center">
                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <LoginFrom />,
    document.getElementById('login-form')

)