import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDetails.css';
import { Modal } from 'react-bootstrap';
import UserCard from '../common/UserCard';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModalFollowers: false,
            setModalFollowing: false,
            followers: [],
            following: []
        }

        this.updateFollowing = this.updateFollowing.bind(this);
        this.handleToggleFollowers = this.handleToggleFollowers.bind(this);
        this.handleToggleFollowing = this.handleToggleFollowing.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps() {
        let user = this.props.data;
        this.setState({
            followers: user.followers,
            following: user.following
        });
    }

    componentDidMount() {
        let user = this.props.data;
        this.setState({
            followers: user.followers,
            following: user.following
        });
    }

    handleToggleFollowers = () => {
        this.setState({
            setModalFollowers: true
        });
    }

    handleToggleFollowing = () => {
        this.setState({
            setModalFollowing: true
        });
    }

    handleClose = () => {
        this.setState({
            setModalFollowers: false,
            setModalFollowing: false
        });
    }

    updateFollowing = async (user, action) => {
        let following = this.state.following;
        if (action === 1) {
            following.push(user);
            await this.setState({ following });
        }
        if (action === 0) {
            let index = following.findIndex(followee => followee._id === user._id);
            if (index > -1)
                following.splice(index, 1);
            await this.setState({ following });
        }
    }

    render() {
        let followers = [];
        if (this.state && this.state.followers) {
            this.state.followers.map(follower => {
                followers.push(<div><UserCard data={follower} toggleModal={this.handleClose} updateFollowing={this.updateFollowing} /><hr /></div>);
                return 0;
            });
        }

        let following = [];
        if (this.state && this.state.following) {
            this.state.following.map(followee => {
                following.push(<div><UserCard data={followee} toggleModal={this.handleClose} updateFollowing={this.updateFollowing} /><hr /></div>);
                return 0;
            });
        }

        return (
            <div className="col-sm-12 my-3 profile-details">
                <div className="row">
                    <div className="col-sm-3">
                        <Link className="followers-link" onClick={this.handleToggleFollowers}><b>{followers.length}</b> Followers</Link>
                    </div>
                    <div className="col-sm-2 following">
                        <Link className="following-link" onClick={this.handleToggleFollowing}><b>{following.length}</b> Following</Link>
                    </div>
                </div>
                <Modal show={this.state.setModalFollowers} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ml-3"><h5><b>Followed by</b></h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {followers}
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.setModalFollowing} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ml-3"><h5><b>Following</b></h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {following}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ProfileDetails;