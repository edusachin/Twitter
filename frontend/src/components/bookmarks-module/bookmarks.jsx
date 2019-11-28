import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";
import "./bookmarks.css";
import TweetCard from '../common/tweetCard';

// TODO: To be replaced with httpService
import axios from 'axios';

class Bookmarks extends Component {
    state = {};
    clearAllBookmarks = e => {
        e.preventDefault();
        let data = {
            //TODO: "user_id":localStorage.getItem("user_id");
            "user_id": "5ddf21ecce8ee76d0ff96a4f****"
        }
        axios.post('http://localhost:3001/api/bookmark/clear', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        tweets: ""
                    });
                    //TODO: show a popup once the toast push is available
                    console.log("Cleared all Bookmarks");
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
            });
    }


    componentDidMount() {
        document.title = "Bookmarks / Twitter";
        if (1 /*TODO:  localStorage.getItem("user_name")*/) {
            this.setState({
                //TODO: userName : localStorage.getItem("user_name")
                userName: "@sachinKarve"
            });
        }
        // TODO: To be replaced with localStorage user_id
        axios.get('http://localhost:3001/api/bookmark/5dcc5343817a8f249e122972')
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
    }
    render() {
        let tweetfeed = [];
        if (this.state && this.state.tweets) {
            this.state.tweets.map(tweet => {
                tweetfeed.push(<TweetCard data={tweet} />);
            });
        } else {
            tweetfeed.push(<div className="row">
                <h2 className="error-msg col-sm-12">You haven’t added any Tweets to your Bookmarks yet</h2>
                <h2 className="error-msg-2 col-sm-12">When you do, they’ll show up here.</h2>
            </div>)
        }
        return (
            <div className="row bookmarks-section">
                <div className="col-sm-7">
                    <div className="row">
                        <div className="content-title col-sm-11">
                            <div className="bookmarks-headers row">
                                <h2>Bookmarks</h2>
                            </div>
                            <div className="bookmarks-username row">
                                {this.state.userName}
                            </div>
                        </div>
                        <div className="content-title col-sm-1">
                            <p className="clear-button">
                                <button onClick={this.clearAllBookmarks}><i className="col-sm-12" class="fas fa-ellipsis-h"></i></button>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {tweetfeed}
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Bookmarks;