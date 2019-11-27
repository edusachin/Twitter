import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Memberships extends Component {
    state = {}
    render() {
        return (
            <Link to={{ pathname: "/lists/feed" }}>
                <button><h2>Memberships</h2></button>
            </Link>);
    }
}

export default Memberships;