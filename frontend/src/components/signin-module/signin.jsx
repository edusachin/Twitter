import React, { Component } from 'react';
import twitter_icon from "../../twitter_icon.png";
import "./signIn.css";
import twitter_wallpaper from "../../twitter_wallpaper.PNG";
import twitter_footer from "../../twitter_footer.PNG";

class SignIn extends Component {
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
                    <button type="button" className="btn btn-outline-primary signup mt-2">Sign up</button>
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
                <div className = "col-sm-12">
                    <img src={twitter_footer} className="twitter_footer" />
                </div>
            </div>
        )
    }
}

export default SignIn;