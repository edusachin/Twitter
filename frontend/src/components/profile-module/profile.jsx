import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ProfileTweets from './profileTweets';
import ProfileLikes from './profileLikes';
import RightPanel from "../right-panel/rightPanel";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class Profile extends Component {
    async componentDidMount() {
        if (this.props.location.state) {
            localStorage.setItem("profile_user_id", this.props.location.state.user_id);
        }
        let result = await apiService.get(`${backendURI}/api/profile/${localStorage.getItem("profile_user_id")}`);
        let user_profile = result.data;
        await this.setState({ user_profile });

        if (user_profile)
            document.title = user_profile.first_name + " / Twitter";
        else
            document.title = "Profile / Twitter";
    }

    render() {
        let user, first_name = "", last_name = "";
        if (this.state && this.state.user_profile) {
            user = this.state.user_profile;
            first_name = this.state.user_profile.first_name;
            last_name = this.state.user_profile.last_name;
        }
        return (
            <div className="row profile-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Profile</h2>
                        <div className="content-title col-sm-12">
                            <h1>{first_name + " " + last_name}</h1>
                        </div>
                        <div className="col-sm-12">
                            <div className="nav-tabs row text-center">
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to="/profile/tweets" exact={true}>Tweets</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-6 py-2 ">
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