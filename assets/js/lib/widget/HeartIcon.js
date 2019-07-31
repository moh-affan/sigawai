define(function (require) {
    'use strict';
    let React = require('../../react');

    return class HeartIcon extends React.Component {
        constructor(props) {
            super(props);
            this.props.filled = false;
        }

        render() {
            let filled = !this.props.filled ? "fa-heart-o" : "fa-heart";
            return <span className={"fa text-danger " + filled}> </span>
        }
    };
});
