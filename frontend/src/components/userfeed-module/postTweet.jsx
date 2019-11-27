import React, { Component } from 'react';

class PostTweet extends Component {
    state = {}
    render() {
        return (
            <div className="row post-tweet">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-1 d-flex justify-content-center m-auto">
                            <i className="fas fa-user font-icon"></i>
                        </div>
                        <form className="col-sm-11">
                            <div className="form-group col-sm-12">
                                <input type="text" className="form-control" placeholder="What's Happening?" />
                            </div>
                            <div className="form-group col-sm-12">
                                <input type="file" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostTweet;