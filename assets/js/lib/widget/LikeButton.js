define(function (require) {
    'use strict';
    let React = require('../../react');
    let HeartIcon = require('jsx!./HeartIcon');

    return class LikeButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = {liked: false};
        }

        check() {
            if (this.state.liked)
                return <span>Like <HeartIcon filled={true}/></span>;
            else return <span>Unlike <HeartIcon filled={false}/></span>;
        }

        render() {
            return <button onClick={
                () => {
                    this.state.liked ? this.setState({liked: false}) : this.setState({liked: true});
                }
            } className={'btn btn-dark'} style={{
                width: 100,
                marginBottom: 5
            }}>
                {this.check()}
            </button>;
        }
    };
});
