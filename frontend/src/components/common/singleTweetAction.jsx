import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './singleTweetAction.css';
import { Modal,Button } from 'react-bootstrap';
import FollowersCard from './followersCard';

class SingleTweetAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModalReTweets : false,
            setModalLikes : false,
            sampleFollowers : [1,2,3]
        }
        this.handleToggleRetweets = this.handleToggleRetweets.bind(this);
        this.handleToggleLikes = this.handleToggleLikes.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggleRetweets = () => {
        this.setState({
            setModalReTweets : true
        });
    }

    handleToggleLikes = () => {
        this.setState({
            setModalLikes : true
        });
    }

    handleClose = () => {
        this.setState({
            setModalLikes : false,
            setModalReTweets : false
        });
    }

    render() {
        const retweetedFollowers = this.state.sampleFollowers.map(data => {
            return (
                <div>
                    <FollowersCard/>
                    <hr/>       
                </div>
            )
        });
        return (
            <div className="col-sm-12 my-3 single-tweet-actions">
                <div className="row">
                    <div className="col-sm-3">
                        <Link className = "retweet-link" onClick = {this.handleToggleRetweets}>10 Retweets</Link>
                    </div>
                    <div className="col-sm-3 likes">
                        <Link className = "likes-link" onClick = {this.handleToggleLikes}>100 Likes</Link>
                    </div>
                </div>
                <Modal show={this.state.setModalReTweets} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className = "ml-3"><h5><b>Retweeted by</b></h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {retweetedFollowers}    
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.setModalLikes} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className = "ml-3"><h5><b>Liked by</b></h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {retweetedFollowers} 
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default SingleTweetAction;