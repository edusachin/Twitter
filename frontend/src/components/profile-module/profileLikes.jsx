import React, { Component } from 'react';
import TweetCard from '../common/tweetCard';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import "./profile.css";

class ProfileLikes extends Component {
    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/tweets/liked/${localStorage.getItem("profile_user_id")}`);
        let liked_tweets = result.data;
        await this.setState({ liked_tweets });
    }

    render() {
        let tweetfeed = [];
        if (this.state && this.state.liked_tweets && this.state.liked_tweets.length) {
            this.state.liked_tweets.map(tweet => {
                tweetfeed.push(<TweetCard data={tweet} />);
                return 0;
            });
        } else {
            if (localStorage.getItem("user_id") === localStorage.getItem("profile_user_id")) {
                tweetfeed.push(<div className="row">
                    <h2 className="error-msg col-sm-12">You have not liked any tweets.</h2>
                    <h2 className="error-msg-2 col-sm-12">When you do, they will show up here.</h2>
                </div>)
            } else {
                tweetfeed.push(<div className="row">
                    <h2 className="error-msg col-sm-12">This user has not liked any tweets.</h2>
                    <h2 className="error-msg-2 col-sm-12">When they do, they will show up here.</h2>
                </div>)
            }
        }
        return (
            <div className="row profile-section">
                {tweetfeed}
            </div>
        );
    }
}

export default ProfileLikes;