import React, { Component } from 'react';
import "./messages.css";
import ConversationsCard from './conversationCard';
// TODO: To be replaced with httpService
import axios from 'axios';
import MessagePane from './messagePane'
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convos: [],
            flag: 0
        };
    }

    onClickHandler = e => {
        console.log(e);
        this.setState({ msg: e, flag: 1 })
    }


    sendMsgHandler = e => {
        // let data = {
        // }
        // axios.post('http://localhost:3001/api/message/5dcc5343817a8f249e122972')
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log(response.data);
        //             this.setState({
        //                 convos: response.data
        //             });
        //         }
        //     })
        //     .catch(err => {
        //         if (err.response && err.response.data) {
        //             this.setState({
        //                 convos: ""
        //             });
        //             console.log(err.response.data);
        //         }
        //     });

    }

    componentDidMount() {
        document.title = "Messages / Twitter";
        // TODO: To be replaced with localStorage user_id
        axios.get('http://localhost:3001/api/message/5dcc5343817a8f249e122972')
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        convos: response.data
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        convos: ""
                    });
                    console.log(err.response.data);
                }
            });

    }
    render() {
        let conversations = [];
        if (this.state && this.state.convos) {
            this.state.convos.map(cnv => {
                conversations.push(<ConversationsCard click={this.onClickHandler} data={cnv} />);
                return;
            });
        } else {
            conversations.push(<div className="row">
                <h2 className="error-msg col-sm-12">Send a message, get a message</h2>
                <h2 className="error-msg-2 col-sm-12">Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media, and more!</h2>
            </div>)
        }
        let messagePane;
        if (this.state.flag) {
            messagePane = (<h2 className="col-sm-12 p-0"><MessagePane msgHandler={this.sendMsgHandler} data={this.state.msg ? this.state.msg : this.state.convos[0]} /></h2>);

        }

        return (
            <div className="row-sm-12 messages-section">
                <h2 className="row content-title border-right content-root-message">Messages</h2>
                <div className="row content-messages">
                    <div className="col-sm-5 border-right">
                        <h2 className="row content-title">Conversations</h2>
                        <p className="row-sm-8 links">{conversations}</p>
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