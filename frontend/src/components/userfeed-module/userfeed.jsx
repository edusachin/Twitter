import React, { Component } from 'react';
import PostTweet from "./postTweet";
import "./user-feed.css";
import TweetCard from '../common/tweetCard';
import RightPanel from "../right-panel/rightPanel";

// TODO: To be replaced with httpService
import axios from 'axios';

class Userfeed extends Component {
    componentDidMount() {
        document.title = "Home / Twitter";

        // TODO: To be replaced with localStorage user_id
        localStorage.setItem("user_id", "5dd8f6e4a098631646debcea");
        axios.get('http://localhost:3001/api/tweets/following/5dd8f6e4a098631646debcea')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        tweets: response.data
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
            });
    };
    handleLike = (tweet_id) => {
        let data = {
            tweet_id: tweet_id,
            user_id: "5dd8f6e4a098631646debcea"
        }
    };
    render() {
        let tweetfeed = [];
        if (this.state && this.state.tweets) {
            this.state.tweets.map(tweet => {
                tweetfeed.push(<TweetCard data={tweet} toggleLike={this.handleLike} />);
            });
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