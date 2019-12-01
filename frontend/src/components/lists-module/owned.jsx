import React, { Component } from 'react';
import { Link } from "react-router-dom";
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';

class Owned extends Component {
    state = {
        owned_lists: []
    }

    async componentDidMount() {
        let result = await apiService.get(`${backendURI}/api/list/${localStorage.getItem("user_id")}/owned`);
        let owned_lists = result.data.owned_lists;
        console.log(owned_lists);
        await this.setState({ owned_lists });
    };

    render() {
        //  let alert = <Alert message={this.state.message} type="success" />
        // let list = []
        // this.state.owned_lists.map(newlist => list.push(newlist))
        // let renderline = null;
        // console.log(list);
        // if (list && list[0]) {
        //     renderline = (<div>
        //         {/* <Link to={{ pathname: "/lists/details/tweets" }}>Owned</Link> */}
        //         {list[0].list_owner}
        //     </div>);
        // }

        console.log(this.state.owned_lists);

        return (

            <div>
                <h4>owned lists</h4>
                <Link to={{ pathname: "/listdetails/tweets" }}>Owned</Link>
            </div>
        );
    }
}

export default Owned;