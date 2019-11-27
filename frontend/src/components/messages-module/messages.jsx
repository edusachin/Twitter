import React, { Component } from 'react';

class Message extends Component {
    state = {};
    componentDidMount() {
        document.title = "Messages / Twitter";
    }
    render() {
        return (
            <div className="row messages-section">
                <h2 className="content-title col-sm-12">Messages</h2>
            </div>);
    }
}

export default Message;