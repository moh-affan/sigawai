define(function (require) {
    'use strict';
    let React = require('../../react');

    return class Footer extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <footer className="footer footer-static footer-light">
                    <p className="clearfix text-muted text-center px-2">
                        <span>Web Developer @ {(new Date()).getFullYear()} &nbsp;
                            <a href="mailto:b4affan@gmail.com" target="_blank"
                               className="text-bold-800 primary darken-2">b4affan@gmail.com</a>
                        </span>
                    </p>
                </footer>
            );
        }
    };
});
