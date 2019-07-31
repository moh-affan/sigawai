define(function (require) {
    'use strict';
    let React = require('../../react');

    return class Menu extends React.Component {
        constructor(props) {
            super(props);
        }

        hasSubs() {
            return Array.isArray(this.props.submenu) && this.props.submenu.length > 0
        }

        render() {
            let active = "";
            if (window.activeMenu === this.props.menu.title)
                active = " active";
            if (!this.hasSubs()) {
                return (
                    <li className={"nav-item" + active}>
                        <a href={this.props.menu.href}>
                            <i className={this.props.menu.iconClass}/>
                            <span data-i18n="" className="menu-title">{this.props.menu.title}</span>
                        </a>
                    </li>
                );
            } else {
                let hasActiveSub = false;
                let subs = this.props.submenu.map((menu) => {
                    let actv = "";
                    if (window.activeMenu === menu.title) {
                        actv = " active";
                        hasActiveSub = true;
                    }
                    return (
                        <li key={menu.id} className={actv}>
                            <a href={menu.href} className="menu-item">{menu.title}</a></li>)
                });
                let clsName = hasActiveSub ? "has-sub nav-item open" : "has-sub nav-item";
                return (
                    <li className={clsName}>
                        <a href="#">
                            <i className={this.props.menu.iconClass}/>
                            <span data-i18n="" className="menu-title">{this.props.menu.title}</span>
                        </a>
                        <ul className="menu-content">
                            {subs}
                        </ul>
                    </li>
                );
            }
        }
    };
});
