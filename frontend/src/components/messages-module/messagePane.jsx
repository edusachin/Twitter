import React, { Component } from 'react';
import './messagePane.css';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class messagePane extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.getMsg();
    }
    componentWillReceiveProps(props) {
        this.props = props;
        this.getMsg();
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
        let msgText = this.state.msgText;
        msgText = e.target.value;
        this.setState({ msgText: msgText })
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
            return (<div className="col-sm-12 user-style">
                <h6 className="col-sm-12">{text.sender.first_name}</h6>
                <p className="col-sm-12">{text.message_content}</p>
            </div>)
        })
        return (
            <div className="row messagepane-card">
                <div className="col-sm-12 pl-0 border-bottom">
                    <h2 className="col-sm-12 content-title border-0">{user.first_name} {user.last_name}</h2>
                </div>

                <div className="row">{messages}</div>
                <div className="row">
                    <div className="col-sm-9 input-form">
                        <input className="col-sm-8 pr-0 actualbox"
                            type="text"
                            name="msgText"
                            value={this.state.msgText}
                            onChange={this.textHandler}
                            placeholder="Start a new message"
                            required={true}
                        />
                        <div className="col-sm-3">
                            <button type="submit" onClick={this.sendMsg}><i className="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default messagePane;