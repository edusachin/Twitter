import React, { Component } from 'react';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import ListCard from './listCard';

class Owned extends Component {
  state = {
    owned_lists: []
  }

  async componentDidMount() {
    let result = await apiService.get(`${backendURI}/api/list/${localStorage.getItem("user_id")}/owned`);
    let owned_lists = result.data;
    console.log(owned_lists);
    await this.setState({ owned_lists });
  };

  render() {
    let lists = this.state.owned_lists;
    let listrender = null;

    if (lists.length > 0) {
      listrender = lists.map(list => {
        return (
          <ListCard key={list._id} data={list} />
        );
      });
    } else {
      listrender = <div className="col-sm-12 list-card text-center"><h5>You haven't created any lists yet</h5> <button className="btn btn-outline-primary">Create</button></div>;
    }

    return (
      <div className="row">
        {listrender}
      </div>
    );
  }
}

export default Owned;