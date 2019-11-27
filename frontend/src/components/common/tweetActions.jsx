import React, { Component } from 'react';
import './tweetActions.css';

class TweetActions extends Component {
    state = {}
    render() {
        return (
            <div className="row col-sm-12 mx-auto tweet-actions">
                <div className="col-sm-11">
                    <div className = "row my-2">
                        <div className = "col-sm-2 likes">
                            <i className="far fa-heart mr-2"></i>
                            Likes
                        </div>
                        <div className = "col-sm-2 replies">
                            <i className="far fa-comment mr-2"></i>
                            Replies
                        </div>
                        <div className = "col-sm-2 mr-3">
                            <i className="fas fa-retweet mr-2"></i>
                            Retweets
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetActions;