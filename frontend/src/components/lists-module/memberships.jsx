import React, { Component } from 'react';
import { Link } from "react-router-dom";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class Memberships extends Component {
    state = {
        membered_lists: []
    }

    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/list/${localStorage.getItem("user_id")}/membership`);
        let membered_lists = result.data.membered_lists;
        console.log(membered_lists);
        await this.setState({ membered_lists });
    };
    render() {
        console.log(this.state.membered_lists);

        return (

            <div>
                <h4>Membered lists</h4>
                <Link to={{ pathname: "/listdetails/tweets" }}>Membered</Link>
            </div>
        );
    }
}

export default Memberships;