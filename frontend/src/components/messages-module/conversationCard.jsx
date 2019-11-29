import React, { Component } from 'react';
import './conversationCard.css';
import placeholder from '../common/placeholder.jpg';

class conversationCard extends Component {
    constructor(props) {
        super(props)
    }

    onClick = e => {
        this.props.click(this.props.data)
    }

    render() {
        let fname = "";
        if (this.props.data.user2 && this.props.data.user2.first_name) {
            fname = this.props.data.user2.first_name;
        } else if (this.props.data.user1 && this.props.data.user1.first_name) {
            fname = this.props.data.user1.first_name;

        }
        return (
            <div onClick={this.onClick} className="row ml-3 content-title conversations-card">
                <div className="col-sm-2 mt-2">
                    <img src={placeholder} className="user-image" />
                </div>
                <div className="col-sm-6 links">
                    <h5><b>{this.props.data.user1 ? this.props.data.user1.first_name : this.props.data.user2.first_name}</b></h5>
                    <h6>@{this.props.data.user1 ? this.props.data.user1.user_name : this.props.data.user2.user_name}</h6>
                </div>
            </div>
        )
    }
}

export default conversationCard;