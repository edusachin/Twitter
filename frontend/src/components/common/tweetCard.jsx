import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './tweetCard.css';
import userPlaceholder from './placeholder.jpg';
import TweetActions from './tweetActions';
import TweetActionDetails from './TweetActionDetails';
import apiService from '../../services/httpService';
import alertService from '../../services/alertService';
import { backendURI } from '../../utils/config';

class TweetCard extends Component {
    constructor(props) {
        super(props);

        this.onHashtagClick = this.onHashtagClick.bind(this);
        this.onTweetImageClick = this.onTweetImageClick.bind(this);
    }

    onHashtagClick = (e) => {
        localStorage.setItem("search_input", e.target.text.replace(/#/g, ''));
    }

    componentDidMount(){
        if(this.props.data){
            this.setState({
                tweet: this.props.data
            });
        }
    }

    componentWillReceiveProps(){
        if(this.props.data){
            this.setState({
                tweet: this.props.data
            });
        }
    }

    deleteTweet = async (e) => {
        let data = {
            user_id: localStorage.getItem("user_id"),
            tweet_id: this.state.tweet.tweet_id || this.state.tweet._id
        };
        let result = await apiService.post(`${backendURI}/api/tweets/delete`, data);
        window.location = "/home";
    } 

    bookmarkTweet = async (e) => {
        let data = {
            user_id: localStorage.getItem("user_id"),
            tweet_id: this.state.tweet.tweet_id || this.state.tweet._id
        };
        let result = await apiService.post(`${backendURI}/api/bookmark`, data);
        window.location = "/bookmarks";
    } 

    removeBookmark = async (e) => {
        let data = {
            user_id: localStorage.getItem("user_id"),
            tweet_id: this.state.tweet._id
        };
        let result = await apiService.post(`${backendURI}/api/bookmark/delete`, data);
        window.location = "/bookmarks";
    };

    onTweetImageClick = (e) => {
        let modal = document.getElementById("tweetImageModal");
        var modalImage = document.getElementById("tweet_image_modal");
        modal.style.display = "block";
        modalImage.src = e.target.src;

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    };

    render() {
        let tweet = this.props.data;
        let tweetImages, retweetInfo, tweetActionDetails, deleteTweet, bookmarkTweet, hashtags = [];
        let tweetOwnerImage = userPlaceholder;

        if (tweet.tweet_image && tweet.tweet_image.length) {
            tweetImages = (
                <div>
                    <div className="tweet-image col-sm-12">
                        <img src={tweet.tweet_image[0]} className="tweet_image" alt="" onClick = {this.onTweetImageClick}/>
                    </div>
                    <div id="tweetImageModal" class="modal">
                        <span class="close">&times;</span>
                        <img class="modal-content" id="tweet_image_modal" />
                        <div id="caption"></div>
                    </div>
                </div>
            );
        }
        if (tweet.tweet_owner && tweet.tweet_owner.user_image) {
            tweetOwnerImage = tweet.tweet_owner.user_image;
        }
        if (tweet.user_id && tweet.tweet_owner._id !== tweet.user_id) {
            retweetInfo = (
                <div className="tweet-owner col-sm-12">
                    <i className="fas fa-retweet mr-2"></i>
                    <Link to={{ pathname: `/profile/${tweet.user_id}` }}>
                        {tweet.first_name} {tweet.last_name}
                    </Link> retweeted
                </div>
            );
        }
        if (tweet.hashtags && tweet.hashtags.length) {
            tweet.hashtags.map(hashtag => {
                hashtag = "#" + hashtag + " ";
                hashtag = (
                    <Link to="/explore/tweets" onClick={this.onHashtagClick}>
                        {hashtag}
                    </Link>
                )
                hashtags.push(hashtag);
                return 0;
            });
        }
        if (tweet.showDetails) {
            tweetActionDetails = (<TweetActionDetails data={tweet} />)
        }

        if((tweet.user_id === localStorage.getItem("user_id") || tweet.tweet_owner._id === localStorage.getItem("user_id")) && !tweet.showDetails){
            deleteTweet = (<a class="dropdown-item" href="" onClick={this.deleteTweet}>Delete Tweet</a>);
        }

        if(tweet.bookmarksPage){
            bookmarkTweet = (<a class="dropdown-item" href="" onClick={this.removeBookmark}>Remove from Bookmarks</a>);
        } else {
            bookmarkTweet = (<a class="dropdown-item" href="" onClick={this.bookmarkTweet}>Bookmark Tweet</a>);
        }

        let tweet_content = (
            <div className="row mx-auto mt-2">
                <div className="col-sm-1 pl-2 p-0 d-flex justify-content-center">
                    <Link to={{ pathname: `/profile/${tweet.tweet_owner._id}` }}>
                        <img src={tweetOwnerImage} className="tweet_owner_image" alt="" />
                    </Link>
                </div>
                <div className="col-sm-11 row">
                    <div className="retweet-info">
                        {retweetInfo}
                    </div>
                    <div className="tweet-owner col-sm-11">
                        <Link to={{ pathname: `/profile/${tweet.tweet_owner._id}` }}><b>{tweet.tweet_owner.first_name} {tweet.tweet_owner.last_name} </b></Link>
                        <Link to={{ pathname: `/profile/${tweet.tweet_owner._id}` }}>@{tweet.tweet_owner.user_name}</Link> . {new Date(tweet.tweet_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </div>
                    <div className="col-sm-1">
                        <div class="btn-group">
                            <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu">
                                {deleteTweet}
                                {bookmarkTweet}
                            </div>
                        </div>

                    </div>
                    <div className="tweet-text col-sm-12">
                        {tweet.tweet_text}
                    </div>
                    <div className="tweet-text col-sm-12">
                        {hashtags}
                    </div>
                    {tweetImages}
                    {tweetActionDetails}
                    <TweetActions data={tweet} />
                </div>
            </div>
        );
        if (!tweet.showDetails) {
            tweet_content = (
                <Link to={{ pathname: "/tweet", state: { tweet_id: tweet._id } }}>
                    {tweet_content}
                </Link>
            );
        }
        return (
            <div className="row mx-auto tweet-card">
                {tweet_content}
            </div>
        );
    }
}

export default TweetCard;