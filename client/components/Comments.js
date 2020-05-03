import React, { Component } from 'react';
import axios from 'axios';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, failedPost: false };

        this.renderComment = this.renderComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderComment(comment, i) {
        return (
            <div className='comment' key={i}>
                <p>
                    <strong>{comment.user}</strong>
                    {comment.text}
                    <button onClick={() => this.props.removeComment(this.props.params.postId, i)} className='remove-comment'>&times;</button>
                </p>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        const { postId } = this.props.params;
        const author = this.refs.author.value;
        const comment = this.refs.comment.value;
        
        if(!author || !comment) { 
            this.setState({ hasError: true });
            return; 
        }

        axios.post('/api/post-comment/', {
            id: postId,
            author,
            comment
        }).
        then((response) => {
            this.props.addComment(postId, author, comment);
            this.refs.commentForm.reset();
            this.setState({ hasError: false });
        })
        .catch((error) => this.setState({ failedPost: true }));
    }

    render() {
        return (
            <div className='comments'>
                {this.props.postComments ? 
                    this.props.postComments.map(this.renderComment)
                :
                    <p>
                        This post has no comments<br/>
                        Leave a comment below!
                    </p>
                }
                <form onSubmit={this.handleSubmit} ref="commentForm" className="comment-form">
                    <input type="text" ref="author" placeholder="author"/>
                    <input type="text" ref="comment" placeholder="comment"/>
                    {this.state.hasError && <p>Please insert an author and a comment!</p>}
                    <input type="submit" className="submit-button"/>
                    {this.state.failedPost && <p>Failed to post the comment!</p>}
                </form>
            </div>
        );
    }   
}