import React, { Component } from 'react';
import './messagePane.css';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class messagePane extends Component {
    constructor(props) {
        super(props)
        let state = {}
    }
    componentWillMount() {
        this.getMsg()
    }
    componentWillReceiveProps() {
        this.getMsg()
    }
    getMsg = async () => {
        let { data: single_conv } = await apiService.get(`${backendURI}/api/message/single/${this.props.user_id}/${this.props.cnv_id}`)
        await this.setState({ single_conv });
    }

    sendMsg = async (e) => {
        if (this.state && this.state.msgText) {
            let data = {
                sender_id: this.props.user_id,
                receiver_id: (this.state && this.state.single_conv.user1) ? this.state.single_conv.user1._id : this.state.single_conv.user2._id,
                conversation_id: this.props.cnv_id,
                message_content: this.state.msgText
            }
            this.setState({
                msgText: ""
            })
            let response = await apiService.post(`${backendURI}/api/message`, data)
            if (response) {
                this.getMsg();
            }
        }
    }

    textHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if (!this.state) {
            return (<div className="messagepane-card">
                <div className="error">You don’t have a message selected</div>
                <div className="error2">Choose one from your existing messages, or start a new one.</div>
            </div>)
        }
        let user = (this.state && this.state.single_conv.user1) ? this.state.single_conv.user1 : this.state.single_conv.user2;
        let messages = this.state.single_conv.message.map(text => {
            return (<div><h6>
                <h10>{text.sender.first_name}:  {text.message_content}</h10>
            </h6></div>)
        })
        return (
            <div className=" messagepane-card">
                <h6 className="col-sm-12 messagepane-name"><b>{user.first_name} {user.last_name}</b></h6>
                <div className="row-sm-4"><h10><ul>{messages}</ul></h10></div>
                <div className="row-sm-4">
                    <div className="col-sm-9 input-form">
                        <input className="col-sm-8 pr-0 actualbox"
                            onChange={this.textHandler}
                            type="text"
                            name="msgText"
                            placeholder="Start a new message"
                            required={true}
                        />
                        <div className="col-sm-3">
                            <button type="submit" onClick={this.sendMsg}><i class="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default messagePane;