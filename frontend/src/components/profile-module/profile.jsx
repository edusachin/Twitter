import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ProfileTweets from './profileTweets';
import ProfileLikes from './profileLikes';
import RightPanel from "../right-panel/rightPanel";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import ProfileDetails from './ProfileDetails';

class Profile extends Component {
    async componentWillReceiveProps() {
        if (this.props.match.params.user_id) {
            let user_id = this.props.match.params.user_id;
            localStorage.setItem("profile_user_id", user_id);
            await this.setState({});
        }
        let result = await apiService.get(`${backendURI}/api/profile/${localStorage.getItem("profile_user_id")}`);
        let user_profile = result.data;
        await this.setState({ user_profile });

        if (user_profile)
            document.title = user_profile.first_name + " / Twitter";
        else
            document.title = "Profile / Twitter";
    }

    async componentDidMount() {
        if (this.props.match.params.user_id) {
            let user_id = this.props.match.params.user_id;
            localStorage.setItem("profile_user_id", user_id);
            await this.setState({});
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
        let user, first_name = "", last_name = "", user_id = "", profileDetails;
        if (this.state && this.state.user_profile) {
            user = this.state.user_profile;
            first_name = user.first_name;
            last_name = user.last_name;
            user_id = user.user_id;
            profileDetails = <ProfileDetails data={this.state.user_profile} />;
        }
        return (
            <div className="row profile-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Profile</h2>
                        <div className="content-title col-sm-12">
                            <h1>{first_name + " " + last_name}</h1>
                        </div>
                        {profileDetails}
                        <div className="col-sm-12">
                            <div className="nav-tabs row text-center">
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to={{ pathname: `/profile/${user_id}/tweets` }} exact={true}>Tweets</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to={{ pathname: `/profile/${user_id}/likes` }} exact={true}>Likes</NavLink>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Switch>
                                <Route
                                    path="/profile/:user_id/tweets"
                                    component={ProfileTweets}
                                />
                                <Route
                                    path="/profile/:user_id/likes"
                                    component={ProfileLikes}
                                />
                                <Redirect
                                    from="/profile/:user_id"
                                    to="/profile/:user_id/tweets"
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