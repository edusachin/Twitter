import React, { Component } from 'react';
import './messagePane.css';

class messagePane extends Component {
    constructor(props) {
        super(props)
    }
    onclick = e => {
        this.props.msgHandler(this.props.data)
    }

    render() {
        let user = (this.props.data && this.props.data.user1) ? this.props.data.user1 : this.props.data.user2;
        console.log(this.props.data);
        let messages = this.props.data.message.map(text => {
            return (<div><h6>
                <h10>{text.sender.first_name}:  {text.message_content}</h10>
            </h6></div>)
        })
        return (
            <div className="content-title messagepane-card">
                <h6 className="col-sm-12 messagepane-name"><b>{user.first_name} {user.last_name}</b></h6>
                <h6 className="col-sm-12 content-title mb-2">@{user.user_name}</h6>
                <h10><ul>{messages}</ul></h10>
                <div className="row">
                    <div className="col-sm-10 text-box">
                        <input className="actualbox" onClick={this.onclick} type="text" placeholder="Start a new message"></input>
                    </div>
                    <div className="col-sm-2">
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default messagePane;