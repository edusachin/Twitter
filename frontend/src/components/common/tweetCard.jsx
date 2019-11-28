import React, { Component } from 'react';
import './tweetCard.css';
import placeholder from './placeholder.jpg';
import placeholderTweetImage from './placeholderImage.jpg';
import TweetActions from './tweetActions';
import SingleTweetAction from './singleTweetAction';

class TweetCard extends Component {
    state = {}
    render() {
        let tweet = this.props.data;
        let tweetImages, retweetInfo;
        if (tweet.tweet_images && tweet.tweet_images.length) {
            tweetImages = (
                <div className="tweet-image col-sm-12">
                    <img src={tweet.tweet_images[0]} className="tweet_image" />
                </div>
            );
        }
        if (tweet.tweet_owner._id !== tweet.user_id) {
            retweetInfo = (
                <div className="tweet-owner col-sm-12">
                    {tweet.first_name} {tweet.last_name} retweeted
                </div>
            );
        }
        return (
            <div className="row mx-auto mt-2 tweet-card">
                <div className="col-sm-1 pl-2 p-0 d-flex justify-content-center">
                    <img src={placeholder} className="tweet_owner_image" />
                </div>
                <div className="col-sm-11 row">
                    <div className = "retweet-info">
                        {retweetInfo}
                    </div>
                    <div className="tweet-owner col-sm-12">
                        <b>{tweet.tweet_owner.first_name} {tweet.tweet_owner.last_name}</b> @{tweet.tweet_owner.user_name} . {new Date(tweet.tweet_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </div>
                    <div className="tweet-text col-sm-12">
                        {tweet.tweet_text}
                    </div>
                    {tweetImages}
                    <SingleTweetAction />
                </div>
            </div >
        );
    }
}

export default TweetCard;