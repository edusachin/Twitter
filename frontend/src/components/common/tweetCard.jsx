import React, { Component } from 'react';
import './tweetCard.css';
import placeholder from './placeholder.jpg';
import placeholderTweetImage from './placeholderImage.jpg';

class TweetCard extends Component {
    state = {}
    render() {
        return (
            <div className="row col-sm-12 mx-auto mt-2 tweet-card">
                <div className="col-sm-1 d-flex justify-content-center">
                    <img src={placeholder} className="tweet_owner_image" />
                </div>
                <div className="col-sm-11">
                    <div className="tweet-owner col-sm-12">
                        Tweet owner name. Tweet owner handle. Date
                    </div>
                    <div className="tweet-text col-sm-12">
                        Tweet-Text
                    </div>
                    <div className="tweet-image col-sm-12">
                        <img src={placeholderTweetImage} className="tweet_image" />
                    </div>
                    <div className = "row my-2">
                        <div className = "col-sm-1 ml-3 likes">
                            <i className="far fa-heart mr-2"></i>
                            Likes
                        </div>
                        <div className = "col-sm-2 ml-5 replies">
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

export default TweetCard;