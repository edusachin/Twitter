import React, { Component } from 'react';
import './messagePane.css';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class messagePane extends Component {
    constructor(props) {
        super(props)
        let state = {}
        //this.getMsg();
    }
    componentWillMount(){
        this.getMsg()
    }
    componentWillReceiveProps(){
        console.log(`received something!!!!!!!!!!!`);
        console.log(this.props);
        this.getMsg()
    }
    getMsg = async () => {
        let { data: single_conv } = await apiService.get(`${backendURI}/api/message/single/${this.props.user_id}/${this.props.cnv_id}`)
        console.log(`******----getMsg----*******`);
        console.log(single_conv);
        await this.setState({ single_conv });
    }

    sendMsg = async (e) => {
        if (this.state && this.state.msgText) {
            
            let data = {
                sender_id: this.props.user_id,
                receiver_id: (this.state && this.state.single_conv.user1) ? this.state.single_conv.user1._id :this.state.single_conv.user2._id,
                conversation_id: this.props.cnv_id,
                message_content: this.state.msgText
            }
            this.setState({
                msgText:""
            })
            let response = await apiService.post(`${backendURI}/api/message`, data)
            if(response){
                this.getMsg();
                
            }
        }
    }

    textHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        // console.log(this.state);
        if (!this.state) {
            return (<div className="messagepane-card">
            <div className="error">You don’t have a message selected</div>
        <div className="error2">Choose one from your existing messages, or start a new one.</div>
        </div>)
        }
        // this.source = (this.state && this.state.data) ? this.state.data : this.props.data;
        let user = (this.state && this.state.single_conv.user1) ? this.state.single_conv.user1 : this.state.single_conv.user2;
        console.log(`*******------rendering this.source------******`);
        //console.log(user);
        console.log(this.source);
        let messages = this.state.single_conv.message.map(text => {
            return (<div><h6>
                <h10>{text.sender.first_name}:  {text.message_content}</h10>
            </h6></div>)
        })
        return (
            <div className="content-title messagepane-card">
                <h6 className="col-sm-12 messagepane-name"><b>{user.first_name} {user.last_name}</b></h6>
                <h10><ul>{messages}</ul></h10>
                <div className="row">
                    <div className="col-sm-10">
                        <input className="actualbox"
                            onChange={this.textHandler}
                            type="text"
                            name="msgText"
                            placeholder="Start a new message"
                            required={true}
                        />
                        <div className="">
                            <button type="submit" onClick={this.sendMsg}><i class="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default messagePane;