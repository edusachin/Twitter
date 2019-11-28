import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";

class Explore extends Component {
    state = {};
    componentDidMount() {
        document.title = "Explore / Twitter";
    }
    render() {
        return (
            <div className="row explore-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Explore</h2>
                        <div className="col-sm-12"></div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Explore;