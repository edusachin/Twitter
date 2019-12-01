import React, { Component } from 'react';
import './tweetActions.css';

class TweetActions extends Component {
    state = {}
    render() {
        let tweet = this.props.data;
        let user_id = localStorage.getItem("user_id");
        let likesClass = "far fa-heart mr-2";
        let retweetClass = "fas fa-retweet custom-color mr-2";
        if (tweet.likes_count !== 0 && tweet.likes) {
            if (tweet.likes.includes(user_id) || tweet.likes.find(like => like._id === user_id))
                likesClass = "fas fa-heart custom-color mr-2";
        }

        if (tweet.retweets_count !== 0 && tweet.retweeters) {
            if (tweet.retweeters.includes(user_id) || tweet.retweeters.find(retweet => retweet._id === user_id))
                retweetClass = "fas fa-retweet custom-color mr-2";
        }
        return (
            <div className="col-sm-12 my-3 tweet-actions">
                <div className="row">
                    <div className="col-sm-4 likes">
                        <i className={likesClass}></i>
                        <span>{tweet.likes_count !== 0 ? tweet.likes_count : ""}</span>
                    </div>
                    <div className="col-sm-4 replies">
                        <i className="far fa-comment mr-2"></i>
                        <span>{tweet.rereplies_count !== 0 ? tweet.rereplies_count : ""}</span>
                    </div>
                    <div className="col-sm-4">
                        <i className="fas fa-retweet mr-2"></i>
                        <span>{tweet.retweets_count !== 0 ? tweet.retweets_count : ""}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetActions;