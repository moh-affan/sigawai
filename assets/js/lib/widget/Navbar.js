define(function (require) {
    'use strict';
    let React = require('../../react');
    const config = {
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken'
    };

    return class Navbar extends React.Component {
        constructor(props) {
            super(props);
            this.doLogout = this.doLogout.bind(this);
        }

        componentDidMount() {
            let $this = this;
            // Page full screen
            $('.apptogglefullscreen').on('click', function (e) {
                if (typeof screenfull != 'undefined') {
                    if (screenfull.enabled) {
                        screenfull.toggle();
                    }
                }
            });
            if (typeof screenfull != 'undefined') {
                if (screenfull.enabled) {
                    $(document).on(screenfull.raw.fullscreenchange, function () {
                        if (screenfull.isFullscreen) {
                            $('.apptogglefullscreen').find('i').toggleClass('ft-minimize ft-maximize');
                        } else {
                            $('.apptogglefullscreen').find('i').toggleClass('ft-maximize ft-minimize');
                        }
                    });
                }
            }
        }

        doLogout() {
            axios.delete('/login', {}, config)
                .then(function (response) {
                    if (typeof response.data.success !== 'undefined' && typeof response.data.success)
                        window.location.href = '/login';
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
                <nav className="navbar navbar-expand-lg navbar-light bg-faded">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" data-toggle="collapse" className="navbar-toggle d-lg-none float-left">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <span className="d-lg-none navbar-right navbar-collapse-toggle">
                                <a className="open-navbar-container">
                                    <i className="ft-more-vertical"/>
                                </a></span>
                            <a id="navbar-fullscreen" href="javascript:void(0)"
                               className="mr-2 display-inline-block apptogglefullscreen">
                                <i className="ft-maximize blue-grey darken-4 toggleClass"/>
                                <p className="d-none">fullscreen</p>
                            </a>
                        </div>
                        <div className="navbar-container">
                            <div id="navbarSupportedContent" className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    <li className="nav-item mt-1 navbar-search text-left dropdown">
                                        <a id="search" href="#" data-toggle="dropdown"
                                           className="nav-link dropdown-toggle">
                                            <i className="ft-search blue-grey darken-4"/></a>
                                        <div aria-labelledby="search"
                                             className="search dropdown-menu dropdown-menu-right">
                                            <div className="arrow_box_right">
                                                <form role="search" className="navbar-form navbar-right">
                                                    <div className="position-relative has-icon-right mb-0">
                                                        <input id="navbar-search" type="text" placeholder="Search"
                                                               className="form-control"/>
                                                        <div className="form-control-position navbar-search-close">
                                                            <i className="ft-x"/></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown nav-item mr-0">
                                        <a id="dropdownBasic3" href="#" data-toggle="dropdown"
                                           className="nav-link position-relative dropdown-user-link dropdown-toggle">
                                            <span className="avatar avatar-online">
                                                <img id="navbar-avatar"
                                                     src="/public/convex/img/portrait/small/avatar-s-3.jpg"
                                                     alt="avatar"/></span>
                                            <p className="d-none">User Settings</p></a>
                                        <div aria-labelledby="dropdownBasic3"
                                             className="dropdown-menu dropdown-menu-right">
                                            <div className="arrow_box_right">
                                                <a href="user-profile-page.html" className="dropdown-item py-1">
                                                    <i className="ft-edit mr-2"/><span>My Profile</span></a>
                                                <a href="javascript:void(0)" className="dropdown-item py-1">
                                                    <i className="ft-settings mr-2"/><span>Settings</span></a>
                                                <div className="dropdown-divider"/>
                                                <a href="#" onClick={this.doLogout} className="dropdown-item">
                                                    <i className="ft-power mr-2"/><span>Logout</span></a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
    };
});
