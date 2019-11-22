import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class Sidebar extends Component {
    state = {}
    render() {
        return (

            <ul >
                <li >
                    <NavLink className="nav-link" to="/home" exact={true} >Home</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/messages" exact={true} >Messages</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/bookmarks" exact={true}>Bookmarks</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/lists" exact={true}>Lists</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/profile" exact={true}>Profile</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/analytics" exact={true}>Analytics</NavLink>
                </li>
            </ul>
        );
    }
}

export default Sidebar;