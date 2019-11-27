import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Subscriptions extends Component {
    state = {}
    render() {
        return (
            <Link to={{ pathname: "/lists/feed" }}>
                <button><h2>Subscriptions</h2></button>
            </Link>);
    }
}

export default Subscriptions;