import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import TweetCard from '../common/tweetCard';
import apiService from '../../services/httpService';
import { backendURI } from '../../utils/config';
import RightPanel from "../right-panel/rightPanel";

class TweetPage extends Component {
    async componentDidMount() {
        if (this.props.location.state) {
            let tweet_id = this.props.location.state.tweet_id;
            localStorage.setItem("tweet_id", tweet_id);
            let result = await apiService.get(`${backendURI}/api/tweets/tweet/${localStorage.getItem("tweet_id")}`);
            let tweet = result.data;
            await this.setState({ tweet });

            if (tweet)
                document.title = tweet.tweet_owner.first_name + " on Twitter";
            else
                document.title = "Tweet / Twitter";
        }
    }
    onDelete = () => {
        this.setState({
            deleted: true
        });
    }

    render() {
        let tweet, tweetCard, redirectVar;
        if (this.state && this.state.tweet) {
            tweet = this.state.tweet;
            tweet.showDetails = true;
            tweetCard = (<TweetCard data={tweet} onDelete={this.onDelete}/>)
        }
        if(this.state && this.state.deleted){
            redirectVar = (<Redirect to="/home" />);
        }
        return (
            <div className="row tweetpage">
                {redirectVar}
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Tweet</h2>
                        {tweetCard}
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default TweetPage;