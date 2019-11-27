import React, { Component } from 'react';
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
                        <div className="col-sm-12"></div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Profile;