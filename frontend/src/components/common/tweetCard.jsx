import React, { Component } from 'react';
import './tweetCard.css';
import placeholder from './placeholder.jpg';
import placeholderTweetImage from './placeholderImage.jpg';
import TweeetActions from './tweetActions';


class TweetCard extends Component {
    state = {}
    render() {
        return (
            <div className="row mx-auto mt-2 tweet-card">
                <div className="col-sm-2 d-flex justify-content-center">
                    <img src={placeholder} className="tweet_owner_image" />
                </div>
                <div className="col-sm-10 row pl-0">

                    <div className="tweet-owner col-sm-12">
                        Tweet owner name. Tweet owner handle. Date
                    </div>
                    <div className="tweet-text col-sm-12">
                        Tweet-Text
                    </div>
                    <div className="tweet-image col-sm-12">
                        <img src={placeholderTweetImage} className="tweet_image" />
                    </div>
                    <TweeetActions />
                </div>
            </div >
        );
    }
}

export default TweetCard;