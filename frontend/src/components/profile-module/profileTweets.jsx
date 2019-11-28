import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProfileTweets extends Component {
    state = {}

    render() {
        return (<Link to={{ pathname: "/tweetpage" }}>Profile Tweets</Link>);
    }
}

export default ProfileTweets;