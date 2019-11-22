import React, { Component } from 'react';

class TweetCard extends Component {
    state = {}
    render() {
        return (
            <div className="row col-sm-12 tweet-card">
                <div className="col-sm-1 d-flex justify-content-center">
                    <i className="fas fa-user"></i>
                </div>
                <div className="col-sm-11">
                    <div className="tweet-owner col-sm-12">
                        tweet owner name
                    </div>
                    <div className="tweet-text col-sm-12">
                        tweet-text
                    </div>
                    <div className="tweet-image col-sm-12">
                        Tweet Image
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetCard;