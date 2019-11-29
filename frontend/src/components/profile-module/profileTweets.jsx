import React, { Component } from 'react';
import TweetCard from '../common/tweetCard';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import "./profile.css";

class ProfileTweets extends Component {
    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/tweets/user/${localStorage.getItem("profile_user_id")}/1`);
        let user_tweets = result.data;
        await this.setState({ user_tweets });
    }

    render() {
        let tweetfeed = [];
        if (this.state && this.state.user_tweets && this.state.user_tweets.length) {
            this.state.user_tweets.map(tweet => {
                tweetfeed.push(<TweetCard data={tweet} />);
            });
        } else {
            if (localStorage.getItem("user_id") === localStorage.getItem("profile_user_id")) {
                tweetfeed.push(<div className="row">
                    <h2 className="error-msg col-sm-12">You have not posted any tweets.</h2>
                    <h2 className="error-msg-2 col-sm-12">When you do, your tweets will show up here.</h2>
                </div>)
            } else {
                tweetfeed.push(<div className="row">
                    <h2 className="error-msg col-sm-12">This user has not posted any tweets.</h2>
                    <h2 className="error-msg-2 col-sm-12">When they do, their tweets will show up here.</h2>
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

export default ProfileTweets;