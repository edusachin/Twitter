import React, { Component } from 'react';
import ConversationsCard from './conversationCard';
import MessagePane from './messagePane'
import apiService from '../../services/httpService';

import "./messages.css";

// TODO: To be replaced with httpService
import axios from 'axios';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convos: [],
            flag: 0
        };
    }

    onClickHandler = e => {
        this.setState({ msg: e, flag: 1 })
    }

    componentWillMount = async () => {
        document.title = "Messages / Twitter";
        let result;
        result = await apiService.get('http://localhost:3001/api/message/5dcc5343817a8f249e122972')
        this.setState({
            convos: result.data ? result.data : ""
        });
    }

    render() {
        let conversations = [];
        if (this.state && this.state.convos) {
            this.state.convos.map(cnv => {
                conversations.push(<ConversationsCard click={this.onClickHandler} data={cnv} />);
            });
        } else {
            conversations.push(<div className="row">
                <h2 className="error-msg col-sm-12">Send a message, get a message</h2>
                <h2 className="error-msg-2 col-sm-12">Direct Messages are private conversations
                between you and other people on Twitter. Share Tweets, media, and more!</h2>
            </div>)
        }
        let messagePane;
        if (this.state.flag) {
            messagePane = (<h2 className="col-sm-12 p-0"><MessagePane
                cnv_id={this.state.msg._id} user_id={'5dcc5343817a8f249e122972'} /></h2>);
        } else {
            messagePane = (<div>
                <div className="error-msg">You don’t have a message selected</div>
                <div className="error-msg2">Choose one from your existing messages, or start a new one.</div>
            </div>)
        }

        return (
            <div className="row-sm-12 messages-section">
                <h2 className="row content-title border-right content-root-message">Messages</h2>
                <div className="row content-messages">
                    <div className="col-sm-5 border-right">
                        <h2 className="row content-title">Conversations</h2>
                        {/* <button className="row-sm-2 size-2"><i class="fas fa-plus"></i></button> */}

                        <div className="row-sm-8 links">{conversations}</div>
                    </div>
                    <div className="col-sm-7 border-right p-0">
                        {messagePane}
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;