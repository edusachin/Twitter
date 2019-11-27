import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";

class Lists extends Component {
    state = {};
    componentDidMount() {
        document.title = "Lists / Twitter";
    }
    render() {
        return (
            <div className="row lists-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">List</h2>
                        <div className="col-sm-12"></div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Lists;