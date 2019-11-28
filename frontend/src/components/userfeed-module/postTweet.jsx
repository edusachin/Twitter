import React, { Component } from 'react';
import './postTweet.css';
import placeholder from '../common/placeholder.jpg';

class PostTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null
        }
    }
    
    handleImage = (e) => {
        this.setState({
            file : URL.createObjectURL(e.target.files[0])
        });
    }

    render() {
        return (
            <div className="row post-tweet">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-1 d-flex justify-content-center m-auto">
                            <img src={placeholder} className="tweet-owner-image ml-3 mb-5" alt=""/>
                        </div>
                        <form className="col-sm-11">
                            <div className="form-group col-sm-12 mt-1">
                                <input type="text" className="form-control" placeholder="What's Happening?" />
                            </div>
                            <div className = "image-viewer col-sm-12 ml-4 mb-2">
                                <img src = {this.state.file} className = "preview-image" alt=""/>
                            </div>
                            <div className = "col-sm-12 row">
                                <div className="col-sm-6"> 
                                    <label for = "file-input">
                                        <i class="far fa-image fa-2x"></i>
                                    </label>
                                    <input type="file" id = "file-input" onChange = {this.handleImage}/>
                                </div>        
                                <div className = "col-sm-6 tweet-button mb-3">
                                    <button className = "btn btn-primary">Tweet</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostTweet;