import React, { Component } from 'react';
import twitter_icon from "../../twitter_icon.png";
import "./signIn.css";
import twitter_wallpaper from "../../twitter_wallpaper.PNG";
import twitter_footer from "../../twitter_footer.PNG";
import { Modal,Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            setModal : false,
            firstName : "",
            lastName : "",
            userName : "",
            email : "",
            password : "",
            alertShow : false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleToggle = () => {
        this.setState({
            setModal : true
        });
    }

    handleClose = () => {
        this.setState({
            setModal : false,
            alertShow : false
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSignUp = () => {
        const data = {
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            email_id : this.state.email,
            user_name : this.state.userName,
            password : this.state.password
        }
        axios.post('http://localhost:3001/api/signup',data)
        .then(response => {
            if(response.status == 200) {
                console.log(response.data);
                this.setState({
                    alertShow : true
                })
            }
        })
        .catch(err => {
            if (err.response && err.response.data) {
                console.log(err.response.data);
            }
        });
    };

    componentDidMount() {
        document.title = "Twitter. It's what's happening."
    }
    render() {
        return (
            <div className = "row sign-in">
                <div className = "col-sm-6">
                    <img src={twitter_wallpaper} className="twitter_wallpaper" />
                </div>
                <div className = "col-sm-2 userfield">
                    <div className="input-group mt-5 username">
                        <input type="textName" className="form-control" placeholder="Email or Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <img src={twitter_icon} className="twitter_icon" />
                    <h2 className = "bodytext1">See what's happening in the world right now</h2>
                    <h2 className = "bodytext2 mt-5">Join Twitter today</h2>
                    <button type="button" className="btn btn-outline-primary signup mt-2" onClick = {this.handleToggle}>Sign up</button>
                </div>
                <div className = "col-sm-2 passwordfield">
                    <div className="input-group ml-5 mt-5 password">
                        <input type="textName" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className = "col-sm-2 loginbutton">
                    <div className="input-group mt-5 login">
                        <button type="button" className="btn btn-outline-primary">Log in</button>
                    </div>
                </div>
                <Modal show={this.state.setModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Create your account</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Alert show = {this.state.alertShow} variant = 'success'>
                        Sign-up successful.
                    </Alert>    
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><b>First Name</b></span>
                        </div>
                        <input type="text" name = "firstName" className="form-control" aria-label="FirstName" aria-describedby="basic-addon1" onChange = {this.handleChange}/>
                    </div>

                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><b>Last Name</b></span>
                        </div>
                        <input type="text" name = "lastName" className="form-control" aria-label="LastName" aria-describedby="basic-addon1" onChange = {this.handleChange}/>
                    </div>

                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><b>Username</b></span>
                        </div>
                        <input type="text" name = "userName" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange = {this.handleChange}/>
                    </div>

                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><b>Email</b></span>
                        </div>
                        <input type="text" name = "email" className="form-control" aria-label="Email" aria-describedby="basic-addon1" onChange = {this.handleChange}/>
                    </div>

                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><b>Password</b></span>
                        </div>
                        <input type="text" name = "password" className="form-control" aria-label="Email" aria-describedby="basic-addon1" onChange = {this.handleChange}/>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick = {this.handleSignUp}>
                            <b>Sign Up</b>
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            <b>Close</b>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default SignIn;