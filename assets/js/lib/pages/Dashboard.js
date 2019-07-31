define(function (require) {
    'use strict';
    const React = require('../../react');

    return class Dashboard extends React.Component {

        constructor(props) {
            super(props);
        }

        componentDidMount() {

        }

        render() {
            return (
                <div className="container-fluid">
                    <section id="minimal-statistics">
                        <div className="row">
                            <div className="col-12 mt-3 mb-1">
                                <h2 className="content-header">Minimal Statistics Cards</h2>
                                <p className="content-sub-header">Statistics on minimal cards.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="px-3 py-3">
                                            <div className="media">
                                                <div className="media-body text-left align-self-center">
                                                    <i className="icon-pencil info font-large-2 float-left"/>
                                                </div>
                                                <div className="media-body text-right">
                                                    <h3>278</h3>
                                                    <span>New Posts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="px-3 py-3">
                                            <div className="media">
                                                <div className="media-body text-left align-self-center">
                                                    <i className="icon-speech warning font-large-2 float-left"/>
                                                </div>
                                                <div className="media-body text-right">
                                                    <h3>156</h3>
                                                    <span>Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="px-3 py-3">
                                            <div className="media">
                                                <div className="media-body text-left align-self-center">
                                                    <i className="icon-graph success font-large-2 float-left"/>
                                                </div>
                                                <div className="media-body text-right">
                                                    <h3>64%</h3>
                                                    <span>Bounce</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="px-3 py-3">
                                            <div className="media">
                                                <div className="media-body text-left align-self-center">
                                                    <i className="icon-pointer danger font-large-2 float-left"/>
                                                </div>
                                                <div className="media-body text-right">
                                                    <h3>423</h3>
                                                    <span>Total Visits</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media align-items-stretch">
                                            <div className="p-2 text-center bg-info rounded-left pt-3">
                                                <i className="icon-camera font-large-2 text-white"/>
                                            </div>
                                            <div className="p-2 media-body">
                                                <h6>Products</h6>
                                                <h5 className="text-bold-400 mb-0">28</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media align-items-stretch">
                                            <div className="p-2 text-center bg-danger rounded-left pt-3">
                                                <i className="icon-user font-large-2 text-white"/>
                                            </div>
                                            <div className="p-2 media-body">
                                                <h6>New Users</h6>
                                                <h5 className="text-bold-400 mb-0">1,22,356</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media align-items-stretch">
                                            <div className="p-2 text-center bg-success rounded-left pt-3">
                                                <i className="icon-basket-loaded font-large-2 text-white"/>
                                            </div>
                                            <div className="p-2 media-body">
                                                <h6>New Orders</h6>
                                                <h5 className="text-bold-400 mb-0">4,65,879</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media align-items-stretch">
                                            <div className="p-2 text-center bg-warning rounded-left pt-3">
                                                <i className="icon-wallet font-large-2 text-white"/>
                                            </div>
                                            <div className="p-2 media-body">
                                                <h6>Total Profit</h6>
                                                <h5 className="text-bold-400 mb-0">5.6 M</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    };
});
