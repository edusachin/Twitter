import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ProfileTweets from './profileTweets';
import ProfileLikes from './profileLikes';
import RightPanel from "../right-panel/rightPanel";

class Profile extends Component {
    state = {};
    componentDidMount() {
        document.title = "Profile / Twitter";
    }
    render() {
        return (
            <div className="row profile-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Profile</h2>
                        <div className="content-title col-sm-12">
                            <h1>Profile Info Card</h1>
                        </div>
                        <div className="col-sm-12">
                            <div className="nav-tabs row text-center">
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2" to="/profile/tweets" exact={true}>Tweets</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2" to="/profile/likes" exact={true}>Likes</NavLink>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Switch>
                                <Route
                                    path="/profile/tweets"
                                    component={ProfileTweets}
                                />
                                <Route
                                    path="/profile/likes"
                                    component={ProfileLikes}
                                />
                                <Redirect
                                    from="/profile"
                                    to="/profile/tweets"
                                    exact
                                    component={ProfileTweets}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Profile;