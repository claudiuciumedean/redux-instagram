import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

export default class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = { image: null, failedPost: false, hasError: false };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);

        console.log(this.props);
    }

    uploadFile(e) {
        const files = e.target.files;
        const data = new FormData();

        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        axios.post('https://api.cloudinary.com/v1_1/dgfogulkz/image/upload', data)
            .then((response) => this.setState({ image: response.data.eager[0].secure_url }))
            .catch((error) => console.log(error));
    }
    

    handleSubmit(e) {
        e.preventDefault();
        const caption = this.refs.caption.value;

        if(!this.state.image || !caption) {
            this.setState({ hasError: true });
            return;
        }

        axios.post('/api/create-post/', {
            image: this.state.image,
            caption
        })
        .then((response) => {
            this.props.addPost(response.data);
            this.props.history.push('/');
        })
        .catch((error) => this.setState({ failedPost: true }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} ref='commentForm' className='comment-form'>
                <input type='file' id='file' name='file' ref='file' placeholder='Upload an image' required onChange={this.uploadFile}/>
                {this.state.image && <img className='uploaded-photo' src={this.state.image} alt="Upload preview"/>}                 
                <textarea id='description' name='description' ref='caption' placeholder='Enter a description' required></textarea> 
                {this.state.hasError && <p>Please upload an image and insert a caption!</p>}
                <input type='submit' className='submit-button'/>
                {this.state.failedPost && <p>Failed to create post!</p>}
            </form>
        );
    }    
};