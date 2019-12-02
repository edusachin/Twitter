import React, { Component } from 'react';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import ListCard from './listCard';

class Subscriptions extends Component {
    state = {
        subscribed_lists: []
    }

    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/list/${localStorage.getItem("user_id")}/subscription`);
        let subscribed_lists = result.data;
        console.log(subscribed_lists);
        await this.setState({ subscribed_lists });
    };
    render() {
        let lists = this.state.subscribed_lists;
        let listrender = null;

        if (lists.length > 0) {
            listrender = lists.map(list => {
                return (
                    <ListCard key={list._id} data={list} />
                );
            });
        } else {
            listrender = <div className="col-sm-12 text-center"><h5>You have currently not subscribed to any list</h5></div>;
        }

        return (
            <div className="row">
                {listrender}
            </div>
        );
    }
}

export default Subscriptions;