import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import twitter_icon from "../../twitter_icon.png";
import "./sidebar.css";

class Sidebar extends Component {
    state = {}
    render() {
        return (
            <div className="row sidebar">
                <div className="col-sm-12">
                    <div className="col-sm-12 py-3">
                        <img src={twitter_icon} className="twitter_icon" />
                    </div>
                    <div className="col-sm-12 py-3 sidebarItem">
                        <NavLink className="p-2 pr-4" to="/home" exact={true} >Home</NavLink>
                    </div>
                    <div className="col-sm-12 py-3 sidebarItem">
                        <NavLink className="p-2 pr-4" to="/messages" exact={true} >Messages</NavLink>
                    </div>
                    <div className="col-sm-12 py-3 sidebarItem">
                        <NavLink className="p-2 pr-4" to="/bookmarks" exact={true}>Bookmarks</NavLink>
                    </div>
                    <div className="col-sm-12 py-3 sidebarItem">
                        <NavLink className="p-2 pr-4" to="/lists" exact={true}>Lists</NavLink>
                    </div>
                    <div className="col-sm-12 py-3 sidebarItem">
                        <NavLink className="p-2 pr-4" to="/profile" exact={true}>Profile</NavLink>
                    </div>
                    <div className="col-sm-12 py-3 sidebarItem">
                        <NavLink className="p-2 pr-4" to="/analytics" exact={true}>Analytics</NavLink>
                    </div>
                </div>
            </div >
        );
    }
}

export default Sidebar;