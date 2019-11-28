import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './singleTweetAction.css';
import { Modal,Button } from 'react-bootstrap';
import FollowersCard from './followersCard';
import axios from 'axios';

class SingleTweetAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModalReTweets : false,
            setModalLikes : false,
            tweetLikes : [],
            retweeters : []
        }
        this.handleToggleRetweets = this.handleToggleRetweets.bind(this);
        this.handleToggleLikes = this.handleToggleLikes.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggleRetweets = () => {
        this.setState({
            setModalReTweets : true
        });

        axios.get('http://localhost:3001/api/tweets/tweet/5dd91658856a7b191f5aef28')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        retweeters: response.data.retweeters
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
        });
    }

    handleToggleLikes = () => {
        this.setState({
            setModalLikes : true
        });

        axios.get('http://localhost:3001/api/tweets/tweet/5ddef971ee776e2517d5ebf2')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        tweetLikes: response.data.likes
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
        });
    }

    handleClose = () => {
        this.setState({
            setModalLikes : false,
            setModalReTweets : false
        });
    }

    render() {
        let likes = [];
        if(this.state && this.state.tweetLikes) {
            this.state.tweetLikes.map(tweetLike => {
                likes.push(<div><FollowersCard data={tweetLike} /><hr/></div>);
            });
        }

        let retweets = [];
        if(this.state && this.state.retweeters) {
            this.state.retweeters.map(retweet => {
                retweets.push(<div><FollowersCard data={retweet} /><hr/></div>);
            });
        }
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
                        {retweets}  
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.setModalLikes} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className = "ml-3"><h5><b>Liked by</b></h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {likes} 
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default SingleTweetAction;