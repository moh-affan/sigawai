define(function (require) {
    'use strict';
    const React = require('../../react');
    const config = {
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken'
    };

    return class Login extends React.Component {

        constructor(props) {
            super(props);
            this.inputUsername = React.createRef();
            this.inputPassword = React.createRef();
            this.login = this.login.bind(this);
        }

        componentDidMount() {
        }

        login() {
            const urlParams = new URLSearchParams(window.location.search);
            var next = urlParams.get('next');
            if (next === null)
                next = '/';
            let that = this;
            let data = {'username': this.inputUsername.current.value, 'password': this.inputPassword.current.value};
            axios.post('/login', data, config)
                .then(function (response) {
                    if (typeof response.data.username !== 'undefined')
                        window.location.href = next;
                    else
                        toastr.error("error", "Galat");
                })
                .catch(function (error) {
                    toastr.error(error.response.data.message, "Galat");
                })
                .finally(function () {
                    that.setState({});
                });
        }

        render() {
            return (
                <section id="login">
                    <div className="container-fluid">
                        <div className="row full-height-vh">
                            <div
                                className="col-12 d-flex align-items-center justify-content-center gradient-aqua-marine">
                                <div className="card px-4 py-2 box-shadow-2 width-400">
                                    <div className="card-header text-center">
                                        <img src="/public/img/korpri.png" alt="company-logo"
                                             className="mb-3" width="80"/>
                                        <h4 className="text-uppercase text-bold-500 blue darken-1"><span
                                            className="text-success">Si</span>Gawai</h4>
                                        <h4 className="text-uppercase text-bold-400 grey darken-1">Login</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-block">
                                            <form>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <input type="text" className="form-control form-control-lg"
                                                               name="username" id="username" ref={this.inputUsername}
                                                               placeholder="Username" required/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <input type="password" className="form-control form-control-lg"
                                                               name="password" id="password" ref={this.inputPassword}
                                                               placeholder="Password"
                                                               required/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-12">

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="text-center col-md-12">
                                                        <button type="button"
                                                                onClick={this.login}
                                                                className="btn btn-danger px-4 py-2 text-uppercase white font-small-4 box-shadow-2 border-0">Login
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card-footer grey darken-1">
                                        <div className="text-center mb-1">Forgot Password? <a><b>Reset</b></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    };
});
