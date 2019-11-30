import React, { Component } from 'react';
import TweetCard from '../common/tweetCard';
import UserCard from '../common/UserCard';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import "./explore.css";

class ExploreUsers extends Component {
    async componentWillReceiveProps() {

    }

    render() {
        let tweetfeed = [];
        if (this.state && this.state.tweets && this.state.tweets.length) {
            this.state.user_tweets.map(tweet => {
                tweetfeed.push(<TweetCard data={tweet} />);
                return 0;
            });
        } else {
            tweetfeed.push(<div className="row">
                <h2 className="error-msg col-sm-12">Start looking what's happening.</h2>
                <h2 className="error-msg-2 col-sm-12">Search for tweets to see what's happening.</h2>
            </div>)
        }
        return (
            <div className="row explore-section">
                {tweetfeed}
            </div>
        );
    }
}

export default ExploreUsers;