define(function (require) {
    'use strict';
    let React = require('../react');
    let Aside = require('jsx!./widget/Aside');
    let AppSidebar = require('jsx!./widget/AppSidebar');
    let Navbar = require('jsx!./widget/Navbar');
    let Footer = require('jsx!./widget/Footer');

    return class Scaffold extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            // $('.container-fluid').perfectScrollbar();
        }

        getNavigation() {
            return ([<AppSidebar/>,
                <Navbar/>,
                <div className={'main-panel'}>
                    <div className={'main-content'}>
                        <div className={'content-wrapper'}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer/>
                </div>
            ]);
        }

        render() {
            return (
                [
                    <div className={'wrapper'} style={{minHeight: 100 + "vh"}}>
                        {typeof this.props.blank === 'undefined' || this.props.blank === true ? this.props.children : this.getNavigation()}
                    </div>,
                    <Aside/>,
                    <div id="modal-placeholder"/>
                ]
            );
        }
    };
});
