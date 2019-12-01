import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ProfileTweets from './profileTweets';
import ProfileLikes from './profileLikes';
import RightPanel from "../right-panel/rightPanel";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import ProfileDetails from './ProfileDetails';
import placeholder from '../common/placeholder.jpg';
import { Modal, Button } from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    getProfile = async () => {
        if (this.props.match.params.user_id) {
            let user_id = this.props.match.params.user_id;
            localStorage.setItem("profile_user_id", user_id);
            await this.setState({});
        }
        let result = await apiService.get(`${backendURI}/api/profile/${localStorage.getItem("profile_user_id")}`);
        let user_profile = result.data;
        await this.setState({ user_profile });

        if (user_profile.user_id === localStorage.getItem("user_id")) {
            if (user_profile.user_image)
                localStorage.setItem("user_image", user_profile.user_image);
            else
                localStorage.removeItem("user_image");
        }

        if (user_profile)
            document.title = user_profile.first_name + " / Twitter";
        else
            document.title = "Profile / Twitter";
    };

    componentWillReceiveProps() {
        this.getProfile();
    }

    componentDidMount() {
        this.getProfile();
    }

    followUser = async (e) => {
        let data = {
            user_id: localStorage.getItem("user_id"),
            target_user_id: this.state.user_profile.user_id
        };
        let result = await apiService.post(`${backendURI}/api/follow`, data);
        if (result.status === 200) {
            let user_profile = this.state.user_profile;
            user_profile.followers.push({
                _id: localStorage.getItem("user_id"),
                first_name: localStorage.getItem("first_name"),
                last_name: localStorage.getItem("last_name"),
                user_name: localStorage.getItem("user_name"),
                user_image: localStorage.getItem("user_image")
            });
            await this.setState({ user_profile });
        }
    };

    unfollowUser = async (e) => {
        let data = {
            user_id: localStorage.getItem("user_id"),
            target_user_id: this.state.user_profile.user_id
        };
        let result = await apiService.post(`${backendURI}/api/follow/unfollow`, data);
        if (result.status === 200) {
            let user_profile = this.state.user_profile;
            let index = user_profile.followers.findIndex(follower => follower._id === localStorage.getItem("user_id"));
            if (index > -1)
                user_profile.followers.splice(index, 1);
            await this.setState({ user_profile });
        }
    };

    editProfile = () => {
        let user_profile = this.state.user_profile;
        this.setState({
            showModal: true,
            user_id: user_profile.user_id,
            first_name: user_profile.first_name,
            last_name: user_profile.last_name,
            email_id: user_profile.email_id,
            user_name: user_profile.user_name,
            user_bio: user_profile.user_bio || "",
            city: user_profile.city || "",
            state: user_profile.state || "",
            zip_code: user_profile.zip_code || "",
            image: user_profile.image || ""
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleImageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('user_id', this.state.user_id);
        data.append('first_name', this.state.first_name);
        data.append('last_name', this.state.last_name);
        data.append('user_name', this.state.user_name);
        data.append('email_id', this.state.email_id);
        data.append('user_bio', this.state.user_bio);
        data.append('city', this.state.city);
        data.append('state', this.state.state);
        data.append('zipcode', this.state.zip_code);
        data.append('image', this.state.image);
        //formData.append('userimage', this.state.image);

        /*
        let data = {
            user_id: this.state.user_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            user_name: this.state.user_name,
            email_id: this.state.email_id,
            user_bio: this.state.user_bio,
            city: this.state.city,
            state: this.state.state,
            zip_code: this.state.zip_code
        };*/
        let result = await apiService.post(`${backendURI}/api/profile`, data);
        if (result.status === 200) {
            this.getProfile();
            localStorage.setItem("first_name", data.first_name);
            localStorage.setItem("last_name", data.last_name);
            localStorage.setItem("user_name", data.user_name);
            await this.setState({
                showModal: false
            });
        }
    };

    render() {
        let user, first_name = "", last_name = "", user_id = "", user_name = "", email_id = "", user_bio = "", location = "";
        let locationVar, mailVar, userName, profileDetails, userButton, userImage = placeholder;
        if (this.state && this.state.user_profile) {
            user = this.state.user_profile;
            first_name = user.first_name;
            last_name = user.last_name;
            user_name = user.user_name;
            email_id = user.email_id;
            mailVar = (<div><i class="fas fa-envelope pr-2"></i>{email_id}</div>);
            user_id = user.user_id;
            if (user.city && user.state) {
                location = user.city + ", " + user.state;
                locationVar = (<div><i class="fas fa-map-marker-alt pr-2"></i>{location}</div>);
            }
            if (user.user_bio)
                user_bio = user.user_bio;
            if (user.user_image)
                userImage = user.user_image;
            userName = (<div><i class="fas fas fa-at"></i>{user_name}</div>);
            profileDetails = <ProfileDetails data={this.state.user_profile} getProfile={this.getProfile}/>;

            if (user_id === localStorage.getItem("user_id")) {
                userButton = (
                    <div className="col-sm-4 mt-2 follow_button">
                        <button type="button" className="btn btn-outline-primary" onClick={this.editProfile}><b>Edit Profile</b></button>
                    </div>
                );
            } else if (user.followers.find(follower => follower._id === localStorage.getItem("user_id"))) {
                userButton = (
                    <div className="col-sm-4 mt-2 follow_button">
                        <button type="button" className="btn btn-outline-primary" onClick={this.unfollowUser}><b>Unfollow</b></button>
                    </div>
                );
            } else {
                userButton = (
                    <div className="col-sm-4 mt-2 follow_button">
                        <button type="button" className="btn btn-outline-primary" onClick={this.followUser}><b>Follow</b></button>
                    </div>
                );
            }
        }

        return (
            <div className="row profile-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Profile</h2>
                        <div className="col-sm-4 pl-2 p-0 d-flex justify-content-center">
                            <img src={userImage} className="user_profile_image" alt="" />
                        </div>
                        <div className="col-sm-12">
                            <h2>{first_name + " " + last_name}</h2>
                            {userName}
                            <h6>{user_bio}</h6>
                            {locationVar}
                            {mailVar}
                        </div>
                        {userButton}
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
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Update Profile</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>First Name</b></span>
                                </div>
                                <input type="text" name="first_name" className="form-control" aria-label="FirstName" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.first_name} pattern="^[A-Za-z ]+$" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Last Name</b></span>
                                </div>
                                <input type="text" name="last_name" className="form-control" aria-label="LastName" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.last_name} pattern="^[A-Za-z ]+$" required/>
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Username</b></span>
                                </div>
                                <input type="text" name="user_name" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.user_name} pattern="^[A-Za-z0-9_ ]+$" required />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>User Bio</b></span>
                                </div>
                                <input type="text" name="user_bio" className="form-control" aria-label="UserBio" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.user_bio} pattern="^[A-Za-z0-9_!@#?() ]+$"/>
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Email</b></span>
                                </div>
                                <input type="email" name="email_id" className="form-control" aria-label="Email" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.email_id} readOnly />
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>City</b></span>
                                </div>
                                <input type="text" name="city" className="form-control" aria-label="City" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.city} pattern="^[A-Za-z ]+$"/>
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>State</b></span>
                                </div>
                                <input type="text" name="state" className="form-control" aria-label="State" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.state} pattern="^[A-Za-z ]+$"/>
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>ZIP Code</b></span>
                                </div>
                                <input type="text" name="zip_code" className="form-control" aria-label="ZipCode" aria-describedby="basic-addon1" onChange={this.handleChange} defaultValue={this.state.zip_code} pattern="^[0-9]{5}(-[0-9]{4})?$"/>
                            </div>

                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Image</b></span>
                                </div>
                                <input type="file" name="image" className="form-control" aria-label="Image" aria-describedby="basic-addon1" onChange={this.handleImageChange} />
                            </div>

                            <Button variant="primary" type="submit">
                                <b>Update</b>
                            </Button>
                            <Button variant="secondary" onClick={this.handleClose}>
                                <b>Close</b>
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Profile;