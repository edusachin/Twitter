import React, { Component } from 'react';
import Sidebar from "../sidebar/sidebar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Lists from "../lists-module/lists";
import Bookmarks from "../bookmarks-module/bookmarks";
import Userfeed from "../userfeed-module/userfeed";
import Messages from "../messages-module/messages";
import Profile from "../profile-module/profile";
import Analytics from '../analytics-module/analytics';
import "./home.css";

class Home extends Component {
    state = {}
    render() {
        return (
            <div className="container-fluid mx-5 home-page">
                <div className="row">
                    <BrowserRouter>
                        <div className="col-sm-2">
                            <Sidebar />
                        </div>
                        <div className="col-sm-10 content-section border-left">
                            <Switch>
                                <Route
                                    path="/home"
                                    component={Userfeed}
                                />
                                <Route
                                    path="/messages"
                                    component={Messages}
                                />
                                <Route
                                    path="/bookmarks"
                                    component={Bookmarks}
                                />
                                <Route
                                    path="/lists"
                                    component={Lists}
                                />
                                <Route
                                    path="/profile"
                                    component={Profile}
                                />
                                <Route
                                    path="/analytics"
                                    component={Analytics}
                                />
                                <Redirect
                                    from="/"
                                    to="/home"
                                    exact
                                    component={Userfeed}
                                />
                            </Switch>

                        </div>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default Home;
