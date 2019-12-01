import React, { Component } from 'react';
import { Link } from "react-router-dom";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class Subscriptions extends Component {
    state = {
        subscribed_lists: []
    }

    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/list/${localStorage.getItem("user_id")}/subscription`);
        let subscribed_lists = result.data.subscribed_lists;
        console.log(subscribed_lists);
        await this.setState({ subscribed_lists });
    };
    render() {
        console.log(this.state.subscribed_lists);

        return (

            <div>
                <h4>Subscribed lists</h4>
                <Link to={{ pathname: "/listdetails/tweets" }}>Subscribed</Link>
            </div>
        );
    }
}

export default Subscriptions;