import React, { Component } from 'react';
import PostTweet from "./postTweet";
import "./user-feed.css";
import TweetCard from '../common/tweetCard';

class Userfeed extends Component {
    state = {
        tweets: ["1", "2", "3", "4", "5"]
    }
    render() {
        return (
            <div className="row user-feed">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Home</h2>
                        <div className="col-sm-12"><PostTweet /></div>
                        {this.state.tweets.map(data => {
                            return <TweetCard key={data} />
                        })}
                    </div>
                </div>
                <div className="col-sm-5"></div>
            </div>
        );
    }
}

export default Userfeed;