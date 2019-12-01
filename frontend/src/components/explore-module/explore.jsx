import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ExploreUsers from './ExploreUsers';
import ExploreTweets from './ExploreTweets';
import RightPanel from "../right-panel/rightPanel";

class Explore extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.setDefaultText = this.setDefaultText.bind(this);
    }

    componentDidMount() {
        document.title = "Explore / Twitter";
        this.setDefaultText();
    }

    componentWillUnmount() {
        localStorage.removeItem("search_input");
    }

    setDefaultText = () => {
        let defaultSearchText = localStorage.getItem("search_input");
        if(defaultSearchText && defaultSearchText!== ""){
            this.setState({
                defaultSearchText: defaultSearchText
            });
        }
    };

    onChange = async (e) => {
        let searchInput = e.target.value.replace(/#/g, '');
        this.setState({ searchInput });
        localStorage.setItem("search_input", searchInput);
    };

    render() {
        let searchInput, defaultSearchText;
        if (this.state && this.state.searchInput) {
            searchInput = this.state.searchInput;
        }
        if(this.state && this.state.defaultSearchText){
            defaultSearchText = this.state.defaultSearchText;
        }
        return (
            <div className="row explore-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Explore</h2>
                        <div className="form-group col-sm-12 mt-1">
                            <input type="text" className="form-control" placeholder="Search Twitter" defaultValue={defaultSearchText} onChange={this.onChange} />
                        </div>
                        <div className="col-sm-12">
                            <div className="nav-tabs row text-center">
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to={{ pathname: `/explore/users`, state: { searchInput } }} exact={true}>Users</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to={{ pathname: `/explore/tweets`, state: { searchInput } }} exact={true}>Tweets</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Switch>
                                <Route
                                    path="/explore/users"
                                    component={ExploreUsers}
                                />
                                <Route
                                    path="/explore/tweets"
                                    component={ExploreTweets}
                                />
                                <Redirect
                                    from="/explore"
                                    to="/explore/users"
                                    exact
                                    component={ExploreUsers}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
                <RightPanel hideSearchBar={true}/>
            </div>
        );
    }
}

export default Explore;