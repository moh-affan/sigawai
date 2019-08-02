define(function (require) {
    'use strict';
    const React = require('../../react');

    return class SettingMenu extends React.Component {

        constructor(props) {
            super(props);
            this.state = { menus: [] };
            this._editButtonClick = this._editButtonClick.bind(this);
            this._removeButtonClick = this._removeButtonClick.bind(this);
            this._menuFormSubmit = this._menuFormSubmit.bind(this);
            this.ws = new WebSocket('ws://' + window.location.host + '/ws/api/menu/');
        }

        componentDidMount() {
            let $this = this;

            this.ws.onopen = function () {
                $this.ws.send(JSON.stringify({ 'action': 'subscribe', 'group_name': 'broadcast', 'request_id': 1 }));
                $this.ws.send(JSON.stringify({ 'action': 'list', 'request_id': 1 }));
                $this.ws.send(JSON.stringify({ 'action': 'retrieve', 'request_id': 1, 'pk': 3 }));
            };

            this.ws.onmessage = function (d) {
                let shouldResponsive = false;
                if (window.innerWidth < $('table').width())
                    shouldResponsive = true;
                console.log('onmessage page');
                let response = JSON.parse(d.data);
                console.log(response);
                if (response.action === 'list') {
                    $this.setState({ menus: response.data });
                    $this.table = $('table').DataTable({ responsive: shouldResponsive });
                } else if (response.action === 'create' && response.errors.length === 0) {
                    toastr.success("Berhasil menyimpan menu", "Berhasil");
                    $('#form-menu').trigger('reset');
                    if (response.data.parent === null)
                        $this.state.menus.push(response.data);
                    else
                        $this.state.menus.forEach(function (m, i) {
                            if (m.id === response.data.parent)
                                $this.state.menus[i].submenu.push(response.data);
                        });
                    $this.table.destroy();
                    $this.setState({});
                    setTimeout(function () {
                        $this.table = $('table').DataTable({
                            responsive: shouldResponsive
                        });
                    }, 2000);
                }
                $('form').find('select').select2();
            };
        }

        _menuFormSubmit() {
            let data = $('#form-menu').serializeArray();
            let formData = {};
            data.forEach(function (d) {
                formData[d.name] = d.value;
            });
            this.ws.send(JSON.stringify({ 'action': 'create', 'request_id': 1, 'data': formData }));
            return false;
        }

        _editButtonClick(menu) {
            console.log("edit");
            console.log(menu);
            this.setState({});
            let el = document.getElementById('preEditForm').outerHTML.replace('preEditForm', 'editForm');
            el = $(el);
            el.find('.select2').remove();
            el.find('select').removeClass('select2-hidden-accessible');
            $('#modal-placeholder').html(el[0].outerHTML);
            $('form').find('select').select2();
            $('#editForm').find('#edit_title').val(menu.title);
            $('#editForm').find('#edit_iconClass').val(menu.iconClass);
            $('#editForm').find('#edit_href').val(menu.href);
            $('#editForm').find('#edit_parent').val(menu.parent);
            $('body').on('#formEdit', 'submit', function (e) {
                console.log($(this).serializeArray());
                return false;
            });
            $('#editForm').modal('show');
        }

        _removeButtonClick(menu) {
            console.log("remove");
            console.log(menu);
        }

        _renderInput() {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="px-3">
                                    <form className="form form-horizontal" id="form-menu">
                                        <div className="form-body">
                                            <h4 className="form-section">
                                                <i className="icon-book-open" />Form Menu</h4>

                                            <div className="form-group row">
                                                <label className="col-md-3 label-control"
                                                    htmlFor="inpTitle">Title: </label>
                                                <div className="col-md-9">
                                                    <input type="text" id="inpTitle" className="form-control"
                                                        name="title" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 label-control" htmlFor="inpIconClass">
                                                    Icon Class Name : </label>
                                                <div className="col-md-9">
                                                    <input type="text" id="inpIconClass" className="form-control"
                                                        name="iconClass" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 label-control"
                                                    htmlFor="inpHref">Link: </label>
                                                <div className="col-md-9">
                                                    <input type="text" id="inpHref" className="form-control"
                                                        name="href" />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 label-control"
                                                    htmlFor="selectParent">Parent Menu: </label>
                                                <div className="col-md-9">
                                                    <select id="selectParent" name="parent" className="form-control d-block">
                                                        <option value="" selected="" disabled="">--Parent--</option>
                                                        {this.state.menus.map(function (m, i) {
                                                            return (<option value={m.id}>{m.title}</option>)
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <button type="button" className="btn btn-danger mr-1">
                                                <i className="icon-trash" /> Cancel
                                            </button>
                                            <button type="button" onClick={this._menuFormSubmit}
                                                className="btn btn-success">
                                                <i className="icon-note" /> Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        _renderList() {
            let $this = this;
            let no = 0;
            return (<div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body collapse show">
                            <div className="card-block card-dashboard">
                                <hr />
                                <table className="table table-striped table-borderless table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 10 }}>#</th>
                                            <th>Title</th>
                                            <th>Icon Class</th>
                                            <th>Link</th>
                                            <th style={{ width: 100 }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.menus.map(function (menu, i) {
                                            return ([<tr>
                                                <td>{no += 1}</td>
                                                <td>{menu.title}</td>
                                                <td>{menu.iconClass} [<span className={menu.iconClass} />]</td>
                                                <td>{menu.href}</td>
                                                <td>
                                                    <span onClick={() => {
                                                        $this._removeButtonClick(menu)
                                                    }} className="badge badge-danger cursor-pointer"><span
                                                            className="icon-trash" />
                                                    </span>
                                                    &nbsp;
                                                <span onClick={() => {
                                                        $this._editButtonClick(menu)
                                                    }} className="badge badge-info cursor-pointer"><span
                                                            className="icon-pencil" />
                                                    </span>
                                                </td>
                                            </tr>, menu.submenu.map(function (sub, n) {
                                                return (<tr>
                                                    <td>{no += 1}</td>
                                                    <td>&nbsp;&nbsp; - {sub.title}</td>
                                                    <td>&nbsp;&nbsp; {sub.iconClass} [<span className={sub.iconClass} />]
                                                </td>
                                                    <td> &nbsp;&nbsp;{sub.href}</td>
                                                    <td> &nbsp;&nbsp;
                                                    <span onClick={() => {
                                                            $this._removeButtonClick(sub)
                                                        }} className="badge badge-danger cursor-pointer"><span
                                                                className="icon-trash" />
                                                        </span>
                                                        &nbsp;
                                                    <span onClick={() => {
                                                            $this._editButtonClick(sub)
                                                        }} className="badge badge-info cursor-pointer"><span
                                                                className="icon-pencil" />
                                                        </span>
                                                    </td>
                                                </tr>)
                                            })])
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }

        _renderModal() {
            return (
                <div className="modal fade text-left" id="preEditForm" tabIndex="-1" role="dialog"
                    aria-labelledby="myModalLabel33" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="modal-title text-text-bold-600" id="myModalLabel33">Edit Menu</label>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form action="#" id="formEdit">
                                <div className="modal-body">
                                    <label>Title: </label>
                                    <div className="form-group">
                                        <input type="text" placeholder="Title" id="edit_title" name="title"
                                            className="form-control" />
                                    </div>
                                    <label>Icon Class Name: </label>
                                    <div className="form-group">
                                        <input type="text" placeholder="Icon Class Name" id="edit_iconClass"
                                            name="iconClass"
                                            className="form-control" />
                                    </div>
                                    <label>Link: </label>
                                    <div className="form-group">
                                        <input type="text" placeholder="Link" id="edit_href" name="href"
                                            className="form-control" />
                                    </div>
                                    <label>Parent Menu: </label>
                                    <div className="form-group">
                                        <select id="edit_parent" name="parent" className="form-control">
                                            <option value="" selected="" disabled="">--Parent--</option>
                                            {this.state.menus.map(function (m, i) {
                                                return (<option value={m.id}>{m.title}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-outline-secondary"
                                        data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-outline-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

        render() {
            return ([
                <div className="container-fluid">
                    <section id="tabs-with-icons">
                        <div className="row">
                            <div className="col-12 mt-3 mb-1">
                                <h4 className="text-uppercase">Setting Menu</h4>
                                <p>Pengaturan menu aplikasi (membuat dan mengorganisir menu)</p>
                            </div>
                        </div>
                        <div className="row match-height">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title-wrap bar-primary">
                                            <h4 className="card-title">&nbsp;</h4>
                                        </div>
                                    </div>
                                    <div className="card-body"
                                        style={{ minHeight: 100 + 'vh', marginTop: -80 + 'px' }}>
                                        <div className="card-block">
                                            <ul className="nav nav-tabs">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="baseIcon-tab1"
                                                        data-toggle="tab"
                                                        aria-controls="tabList" href="#tabList" aria-expanded="true">
                                                        <i className="fa fa-list-alt" /> List</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="baseIcon-tab2" data-toggle="tab"
                                                        aria-controls="tabInput" href="#tabInput"
                                                        aria-expanded="false"><i
                                                            className="fa fa-pencil-square-o" /> Input</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content px-1 pt-1">
                                                <div role="tabpanel" className="tab-pane active" id="tabList"
                                                    aria-expanded="true" aria-labelledby="baseIcon-tabList">
                                                    {this._renderList()}
                                                </div>
                                                <div className="tab-pane" id="tabInput"
                                                    aria-labelledby="baseIcon-tabInput">
                                                    {this._renderInput()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>, this._renderModal()]
            );
        }
    };
});
