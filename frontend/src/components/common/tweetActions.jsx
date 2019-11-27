import React, { Component } from 'react';
import './tweetActions.css';

class TweetActions extends Component {
    state = {}
    render() {
        return (
            <div className="col-sm-12 my-3 tweet-actions">
                <div className="row">
                    <div className="col-sm-4 likes">
                        <i className="far fa-heart mr-2"></i>
                        Likes
                        </div>
                    <div className="col-sm-4 replies">
                        <i className="far fa-comment mr-2"></i>
                        Replies
                        </div>
                    <div className="col-sm-4">
                        <i className="fas fa-retweet mr-2"></i>
                        Retweets
                </div>
                </div>
            </div>
        );
    }
}

export default TweetActions;