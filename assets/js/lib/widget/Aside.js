define(function (require) {
    'use strict';
    let React = require('../../react');

    return class HeartIcon extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (<aside id="notification-sidebar" className="notification-sidebar d-none d-sm-none d-md-block"><a
                className="notification-sidebar-close"><i className="ft-x font-medium-3"/></a>
                <div className="side-nav notification-sidebar-content">
                    <div className="row">
                        <div className="col-12 mt-1">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a id="base-tab1" data-toggle="tab"
                                       aria-controls="base-tab1" href="#activity-tab"
                                       aria-expanded="true"
                                       className="nav-link active"><strong>Activity</strong></a>
                                </li>
                                <li className="nav-item"><a id="base-tab2" data-toggle="tab"
                                                            aria-controls="base-tab2" href="#settings-tab"
                                                            aria-expanded="false"
                                                            className="nav-link"><strong>Settings</strong></a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="activity-tab" role="tabpanel" aria-expanded="true"
                                     aria-labelledby="base-tab1" className="tab-pane active">
                                    <div id="activity-timeline" className="col-12 timeline-left">
                                        <h6 className="mt-1 mb-3 text-bold-400">RECENT ACTIVITY</h6>
                                        <div className="timeline">
                                            <ul className="list-unstyled base-timeline activity-timeline ml-0">
                                                <li>
                                                    <div className="timeline-icon bg-danger"><i
                                                        className="ft-shopping-cart"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-danger">Update</a><span
                                                        className="d-block">Jim Doe Purchased new equipments for zonal office.</span>
                                                    </div>
                                                    <small className="text-muted">just now</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-primary"><i
                                                        className="fa fa-plane"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-primary">Added</a><span
                                                        className="d-block">Your Next flight for USA will be on 15th August 2015.</span>
                                                    </div>
                                                    <small className="text-muted">25 hours ago</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-dark"><i
                                                        className="ft-mic"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-dark">Assined</a><span
                                                        className="d-block">Natalya Parker Send you a voice mail for next conference.</span>
                                                    </div>
                                                    <small className="text-muted">15 days ago</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-warning"><i
                                                        className="ft-map-pin"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-warning">New</a><span
                                                        className="d-block">Jessy Jay open a new store at S.G Road.</span>
                                                    </div>
                                                    <small className="text-muted">20 days ago</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-primary"><i
                                                        className="ft-inbox"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-primary">Added</a><span
                                                        className="d-block">voice mail for conference.</span>
                                                    </div>
                                                    <small className="text-muted">2 Week Ago</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-danger"><i
                                                        className="ft-mic"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-danger">Update</a><span
                                                        className="d-block">Natalya Parker Jessy Jay open a new store at S.G Road.</span>
                                                    </div>
                                                    <small className="text-muted">1 Month Ago</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-dark"><i
                                                        className="ft-inbox"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-dark">Assined</a><span
                                                        className="d-block">Natalya Parker Send you a voice mail for Updated conference.</span>
                                                    </div>
                                                    <small className="text-muted">1 Month ago</small>
                                                </li>
                                                <li>
                                                    <div className="timeline-icon bg-warning"><i
                                                        className="ft-map-pin"/></div>
                                                    <div className="base-timeline-info"><a href="#"
                                                                                           className="text-uppercase text-warning">New</a><span
                                                        className="d-block">Started New project with Jessie Lee.</span>
                                                    </div>
                                                    <small className="text-muted">2 Month ago</small>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="settings-tab" aria-labelledby="base-tab2" className="tab-pane">
                                    <div id="settings" className="col-12">
                                        <h6 className="mt-1 mb-3 text-bold-400">GENERAL SETTINGS</h6>
                                        <ul className="list-unstyled">
                                            <li>
                                                <div className="togglebutton">
                                                    <div className="switch"><span
                                                        className="text-bold-500">Notifications</span>
                                                        <div className="float-right">
                                                            <div className="form-group">
                                                                <div
                                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                                    <input id="notifications1" checked="checked"
                                                                           type="checkbox"
                                                                           className="custom-control-input"/>
                                                                    <label htmlFor="notifications1"
                                                                           className="custom-control-label"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>Use checkboxes when looking for yes or no answers.</p>
                                            </li>
                                            <li>
                                                <div className="togglebutton">
                                                    <div className="switch"><span className="text-bold-500">Show recent activity</span>
                                                        <div className="float-right">
                                                            <div className="form-group">
                                                                <div
                                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                                    <input id="recent-activity1"
                                                                           checked="checked" type="checkbox"
                                                                           className="custom-control-input"/>
                                                                    <label htmlFor="recent-activity1"
                                                                           className="custom-control-label"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>The for attribute is necessary to bind our custom checkbox
                                                    with the input.</p>
                                            </li>
                                            <li>
                                                <div className="togglebutton">
                                                    <div className="switch"><span
                                                        className="text-bold-500">Notifications</span>
                                                        <div className="float-right">
                                                            <div className="form-group">
                                                                <div
                                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                                    <input id="notifications2" type="checkbox"
                                                                           className="custom-control-input"/>
                                                                    <label htmlFor="notifications2"
                                                                           className="custom-control-label"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>Use checkboxes when looking for yes or no answers.</p>
                                            </li>
                                            <li>
                                                <div className="togglebutton">
                                                    <div className="switch"><span className="text-bold-500">Show recent activity</span>
                                                        <div className="float-right">
                                                            <div className="form-group">
                                                                <div
                                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                                    <input id="recent-activity2" type="checkbox"
                                                                           className="custom-control-input"/>
                                                                    <label htmlFor="recent-activity2"
                                                                           className="custom-control-label"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>The for attribute is necessary to bind our custom checkbox
                                                    with the input.</p>
                                            </li>
                                            <li>
                                                <div className="togglebutton">
                                                    <div className="switch"><span className="text-bold-500">Show your emails</span>
                                                        <div className="float-right">
                                                            <div className="form-group">
                                                                <div
                                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                                    <input id="show-emails" type="checkbox"
                                                                           className="custom-control-input"/>
                                                                    <label htmlFor="show-emails"
                                                                           className="custom-control-label"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>Use checkboxes when looking for yes or no answers.</p>
                                            </li>
                                            <li>
                                                <div className="togglebutton">
                                                    <div className="switch"><span className="text-bold-500">Show Task statistics</span>
                                                        <div className="float-right">
                                                            <div className="form-group">
                                                                <div
                                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                                    <input id="show-stats" checked="checked"
                                                                           type="checkbox"
                                                                           className="custom-control-input"/>
                                                                    <label htmlFor="show-stats"
                                                                           className="custom-control-label"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>The for attribute is necessary to bind our custom checkbox
                                                    with the input.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>);
        }
    };
});
