import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProfileLikes extends Component {
    state = {}

    render() {
        return (<Link to={{ pathname: "/tweet" }}>Profile Likes</Link>);
    }
}

export default ProfileLikes;