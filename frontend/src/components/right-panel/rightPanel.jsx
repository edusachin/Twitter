import React, { Component } from 'react';
import UserCard from '../common/UserCard';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import './rightPanel.css'

class RightPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/follow/users/${localStorage.getItem("user_id")}`);
        let userSuggestions = result.data;
        await this.setState({ userSuggestions });
    }
    render() {
        let suggestions;
        if (this.state && this.state.userSuggestions) {
            suggestions = this.state.userSuggestions.map(user => {
                return (
                    <div key={user._id} >
                        <UserCard data={user} />
                        <hr />
                    </div>
                )
            });
        }
        return (
            <div className="col-sm-5 right-panel border-left">
                <div className="followers_field mt-3">
                    <h4 className="heading ml-3 pt-2"><b>Who to follow</b></h4>
                    <hr />
                    {suggestions}
                </div>
            </div>
        )
    }
}

export default RightPanel;