import React, { Component } from 'react';
import PostTweet from "./postTweet";
import "./user-feed.css";
import TweetCard from '../common/tweetCard';
import RightPanel from "../right-panel/rightPanel";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class Userfeed extends Component {
    async componentDidMount() {
        document.title = "Home / Twitter";

        let result = await apiService.get(`${backendURI}/api/tweets/following/${localStorage.getItem("user_id")}`);
        let tweets = result.data;

        await this.setState({ tweets });
    };
    render() {
        let tweetfeed = [];
        if (this.state && this.state.tweets && this.state.tweets.length) {
            this.state.tweets.map(tweet => {
                tweetfeed.push(<TweetCard data={tweet} />);
                return 0;
            });
        }
        else {
            tweetfeed.push(<div className="row">
                <h2 className="error-msg col-sm-12">There are no Tweets to show you.</h2>
                <h2 className="error-msg col-sm-12">Follow people to see what's happening.</h2>
            </div>)
        }
        return (
            <div className="row user-feed">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Home</h2>
                        <div className="col-sm-12"><PostTweet /></div>
                        {tweetfeed}
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Userfeed;