define(function (require) {
    'use strict';
    let React = require('../../react');
    let Menu = require('jsx!../widget/Menu');
    const config = {
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken'
    };

    return class AppSidebar extends React.Component {
        constructor(props) {
            super(props);
            this.collapse = this.collapse.bind(this);
            this.expand = this.expand.bind(this);
            this.state = { menus: [] };
            this.ws = new WebSocket('wss://' + window.location.host + '/ws/api/menu/');
        }

        componentDidMount() {
            let that = this;
            this.ws.onopen = function () {
                that.ws.send(JSON.stringify({ 'action': 'subscribe', 'group_name': 'broadcast', 'request_id': 1 }));
                that.ws.send(JSON.stringify({ 'action': 'list', 'request_id': 1 }));
            };

            this.ws.onmessage = function (d) {
                console.log('onmessage sidebar');
                let response = JSON.parse(d.data);
                console.log(response);
                if (response.action === 'list') {
                    that.setState({ menus: response.data });
                } else if (response.action === 'create') {
                    if (response.data.parent === null)
                        that.state.menus.push(response.data);
                    else
                        that.state.menus.forEach(function (m, i) {
                            if (m.id === response.data.parent)
                                that.state.menus[i].submenu.push(response.data);
                        });
                    that.setState({});
                }
            };

            var $sidebar = $('.app-sidebar'),
                $sidebar_content = $('.sidebar-content'),
                $sidebar_img = $sidebar.data('image'),
                $sidebar_img_container = $('.sidebar-background'),
                $wrapper = $('.wrapper');

            $sidebar_content.perfectScrollbar();

            if ($sidebar_img_container.length !== 0 && $sidebar_img !== undefined) {
                $sidebar_img_container.css('background-image', 'url("' + $sidebar_img + '")');
            }

            if (!$wrapper.hasClass('nav-collapsed')) {
                $sidebar_content.find('li.active').parents('li').addClass('open');
            }

            // Match the height of each card in a row
            setTimeout(function () {
                $('.row.match-height').each(function () {
                    $(this).find('.card').not('.card .card').matchHeight(); // Not .card .card prevents collapsible cards from taking height
                });
            }, 500);

            $sidebar_content.on('click', '.navigation li a', function () {
                var $this = $(this),
                    listItem = $this.parent('li');

                if (listItem.hasClass('has-sub') && listItem.hasClass('open')) {
                    that.collapse(listItem);
                } else {
                    if (listItem.hasClass('has-sub')) {
                        that.expand(listItem);
                    }

                    // If menu collapsible then do not take any action
                    if ($sidebar_content.data('collapsible')) {
                        return false;
                    }
                    // If menu accordion then close all except clicked once
                    else {
                        var openListItems = listItem.siblings('.open');
                        that.collapse(openListItems);
                        listItem.siblings('.open').find('li.open').removeClass('open');
                    }
                }
            });

            $('body').find('.logo-text').on('click', function () {
                let listItem = $sidebar_content.find('li.open.has-sub'),
                    activeItem = $sidebar_content.find('li.active');

                if (listItem.hasClass('has-sub') && listItem.hasClass('open')) {
                    that.collapse(listItem);
                    listItem.removeClass('open');
                    if (activeItem.closest('li.has-sub')) {
                        let openItem = activeItem.closest('li.has-sub');
                        that.expand(openItem);
                        openItem.addClass('open');
                    }
                } else {
                    if (activeItem.closest('li.has-sub')) {
                        let openItem = activeItem.closest('li.has-sub');
                        that.expand(openItem);
                        openItem.addClass('open');
                    }
                }
                return false;
            });

            $('body').find('.nav-toggle').on('click', function () {
                var $this = $(this),
                    toggle_icon = $this.find('.toggle-icon'),
                    toggle = toggle_icon.attr('data-toggle'),
                    compact_menu_checkbox = $('body').find('.cz-compact-menu');

                if (toggle === 'expanded') {
                    $wrapper.addClass('nav-collapsed');

                    $('.nav-toggle').find('.toggle-icon').removeClass('ft-disc').addClass('ft-circle');
                    toggle_icon.attr('data-toggle', 'collapsed');
                    if (compact_menu_checkbox.length > 0) {
                        compact_menu_checkbox.prop('checked', true);
                    }
                } else {
                    $wrapper.removeClass('nav-collapsed menu-collapsed');

                    $('.nav-toggle').find('.toggle-icon').removeClass('ft-circle').addClass('ft-disc');
                    toggle_icon.attr('data-toggle', 'expanded');
                    if (compact_menu_checkbox.length > 0) {
                        compact_menu_checkbox.prop('checked', false);
                    }
                }
            });

            $sidebar.on('mouseenter', function () {
                if ($wrapper.hasClass('nav-collapsed')) {
                    $wrapper.removeClass('menu-collapsed');
                    var $listItem = $('.navigation li.nav-collapsed-open'),
                        $subList = $listItem.children('ul');

                    $subList.hide().slideDown(300, function () {
                        $(this).css('display', '');
                    });

                    $sidebar_content.find('li.active').parents('li').addClass('open');
                    $listItem.addClass('open').removeClass('nav-collapsed-open');
                }
            }).on('mouseleave', function () {
                if ($wrapper.hasClass('nav-collapsed')) {
                    $wrapper.addClass('menu-collapsed');
                    var $listItem = $('.navigation li.open'),
                        $subList = $listItem.children('ul');
                    $listItem.addClass('nav-collapsed-open');

                    $subList.show().slideUp(300, function () {
                        $(this).css('display', '');
                    });

                    $listItem.removeClass('open');
                }
            });

            if ($(window).width() < 992) {
                $sidebar.addClass('hide-sidebar');
                $wrapper.removeClass('nav-collapsed menu-collapsed');
            }
            $(window).resize(function () {
                if ($(window).width() < 992) {
                    $sidebar.addClass('hide-sidebar');
                    $wrapper.removeClass('nav-collapsed menu-collapsed');
                }
                if ($(window).width() > 992) {
                    $sidebar.removeClass('hide-sidebar');
                    if ($('.toggle-icon').attr('data-toggle') === 'collapsed' && $wrapper.not('.nav-collapsed menu-collapsed')) {
                        $wrapper.addClass('nav-collapsed menu-collapsed');
                    }
                }
            });

            $(document).on('click', '.navigation li:not(.has-sub)', function () {
                if ($(window).width() < 992) {
                    $sidebar.addClass('hide-sidebar');
                }
            });

            $(document).on('click', '.logo-text', function () {
                if ($(window).width() < 992) {
                    $sidebar.addClass('hide-sidebar');
                }
            });


            $('.navbar-toggle').on('click', function (e) {
                e.stopPropagation();
                $sidebar.toggleClass('hide-sidebar');
            });

            $('html').on('click', function (e) {
                if ($(window).width() < 992) {
                    if (!$sidebar.hasClass('hide-sidebar') && $sidebar.has(e.target).length === 0) {
                        $sidebar.addClass('hide-sidebar');
                    }
                }
            });

            $('#sidebarClose').on('click', function () {
                $sidebar.addClass('hide-sidebar');
            });
        }

        loadMenus() {
            return this.state.menus.map((m) => {
                return (<Menu menu={m} submenu={m.submenu} />)
            })
        }

        collapse($listItem, callback) {
            let $subList = $listItem.children('ul');
            $subList.show().slideUp(200, function () {
                $(this).css('display', '');

                $(this).find('> li').removeClass('is-shown');

                $listItem.removeClass('open');

                if (callback) {
                    callback();
                }
            });

        }

        expand($listItem, callback) {
            var $subList = $listItem.children('ul');
            var $children = $subList.children('li').addClass('is-hidden');
            $listItem.addClass('open');

            $subList.hide().slideDown(200, function () {
                $(this).css('display', '');

                if (callback) {
                    callback();
                }
            });


            setTimeout(function () {
                $children.addClass('is-shown');
                $children.removeClass('is-hidden');
            }, 0);
        }

        render() {
            return (
                <div data-active-color="white" data-background-color="crystal-clear"
                    data-image="/public/img/sidebg.jpg" className="app-sidebar">
                    <div className="sidebar-header">
                        <div className="logo clearfix"><a href="#" className="logo-text float-left">
                            <div className="logo-img"><img src="/public/img/korpri_putih.png" alt="Logo" /></div>
                            <span className="text align-middle"><span className="text-success">Si</span>Gawai</span></a>
                            <a id="sidebarToggle"
                                href="javascript:void(0)"
                                className="nav-toggle d-none d-sm-none d-md-none d-lg-block">
                                <i data-toggle="expanded" className="ft-disc toggle-icon" /></a>
                            <a id="sidebarClose" href="javascript:void(0)"
                                className="nav-close d-block d-md-block d-lg-none d-xl-none">
                                <i className="ft-circle" /></a>
                        </div>
                    </div>
                    <div className="sidebar-content">
                        <div className="nav-container">
                            <ul id="main-menu-navigation" data-menu="menu-navigation"
                                className="navigation navigation-main">
                                {this.loadMenus()}
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-background" />
                </div>);
        }
    };
});
