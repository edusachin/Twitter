import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './tweetCard.css';
import userPlaceholder from './placeholder.jpg';
import TweetActions from './tweetActions';
import SingleTweetAction from './singleTweetAction';

class TweetCard extends Component {
    state = {}
    render() {
        let tweet = this.props.data;
        let tweetImages, retweetInfo;
        let tweetOwnerImage = userPlaceholder;

        if (tweet.tweet_images && tweet.tweet_images.length) {
            tweetImages = (
                <div className="tweet-image col-sm-12">
                    <img src={tweet.tweet_images[0]} className="tweet_image" alt="" />
                </div>
            );
        }
        if (tweet.tweet_owner && tweet.tweet_owner.user_image) {
            tweetOwnerImage = tweet.tweet_owner.user_image;
        }
        if (tweet.tweet_owner._id !== tweet.user_id) {
            retweetInfo = (
                <div className="tweet-owner col-sm-12">
                    <i className="fas fa-retweet mr-2"></i>
                    <Link to={{ pathname: '/profile', state: { user_id: tweet.user_id } }}>
                        {tweet.first_name} {tweet.last_name}
                    </Link> retweeted
                </div>
            );
        }
        return (
            <div className="row mx-auto mt-2 tweet-card">
                <Link to={{ pathname: "/tweet", state: { tweet_id: tweet._id } }}>
                    <div className="col-sm-1 pl-2 p-0 d-flex justify-content-center">
                        <Link to={{ pathname: '/profile', state: { user_id: tweet.tweet_owner._id } }}>
                            <img src={tweetOwnerImage} className="tweet_owner_image" alt="" />
                        </Link>
                    </div>
                    <div className="col-sm-11 row">
                        <div className="retweet-info">
                            {retweetInfo}
                        </div>
                        <div className="tweet-owner col-sm-12">
                            <Link to={{ pathname: '/profile', state: { user_id: tweet.tweet_owner._id } }}><b>{tweet.tweet_owner.first_name} {tweet.tweet_owner.last_name} </b></Link>
                            <Link to={{ pathname: '/profile', state: { user_id: tweet.tweet_owner._id } }}>@{tweet.tweet_owner.user_name}</Link> . {new Date(tweet.tweet_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </div>
                        <div className="tweet-text col-sm-12">
                            {tweet.tweet_text}
                        </div>
                        {tweetImages}
                        <TweetActions data={tweet} />
                    </div>
                </Link>
            </div>
        );
    }
}

export default TweetCard;