import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ListTweets extends Component {
    state = {}

    render() {
        return (<Link to={{ pathname: "/tweetpage" }}>List Tweets</Link>);
    }
}

export default ListTweets;