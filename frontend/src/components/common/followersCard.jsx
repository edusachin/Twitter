import React, { Component } from 'react';
import './followersCard.css';
import placeholder from './placeholder.jpg';

class FollowersCard extends Component {
    render() {
        //let followerInfo = this.props.data;
        return(
            <div className = "row ml-3 followers_card">
                <div className = "col-sm-2 mt-1">
                    <img src={placeholder} className="non_follower_image" alt=""/>
                </div>
                <div className = "col-sm-6">
                    {/*<h5><b>{followerInfo.first_name} {followerInfo.last_name}</b></h5>
                    <h6>{followerInfo.user_name}</h6>*/}
                    <h5><b>Person Name</b></h5>
                    <h6>Person handle</h6>
                </div>
                <div className = "col-sm-4 mt-2 follow_button">
                    <button type="button" className="btn btn-outline-primary"><b>Follow</b></button>
                </div>
            </div>
        )
    }
}

export default FollowersCard;