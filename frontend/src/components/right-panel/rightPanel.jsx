import React, { Component } from 'react';
import FollowersCard from '../common/followersCard';
import './rightPanel.css'

class RightPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            not_followers : [1,2,3]
        }
    }
    render() {
        const notFollowers = this.state.not_followers.map(data => {
            return (
                <div>
                    <FollowersCard key={data} />
                    <hr/>
                </div>
            ) 
        })
        return(
            <div className = "col-sm-5 right-panel border-left">
                <div className = "followers_field mt-3">
                    <h4 className = "heading ml-3 pt-2"><b>Who to follow</b></h4>
                    <hr/>
                    {notFollowers}
                </div> 
            </div>
        )
    }
}

export default RightPanel;