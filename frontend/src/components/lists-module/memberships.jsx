import React, { Component } from 'react';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import ListCard from './listCard';

class Memberships extends Component {
    state = {
        membered_lists: []
    }

    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/list/${localStorage.getItem("user_id")}/membership`);
        let membered_lists = result.data;
        await this.setState({ membered_lists });
    }
    render() {
        let lists = this.state.membered_lists;
        let listrender = null;

        if (lists.length > 0) {
            listrender = lists.map(list => {
                return (
                   <ListCard key={list._id} data={list}/>
                );
            });
        } else {
            listrender = <div className="col-sm-12 text-center"><h5>You haven’t been added to any Lists yet</h5></div>;
        }

        return (
            <div className="row">
                {listrender}
            </div>
        );
    }
}

export default Memberships;