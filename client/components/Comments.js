import React from "react";

export default class Comments extends React.Component {
    constructor() {
        super();

        this.renderComment = this.renderComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        if(this.props.postComments) {
            return (
                <div className="comments">
                    {
                        this.props.postComments.map(this.renderComment)
                    }
                    <form onSubmit={this.handleSubmit} ref="commentForm" className="comment-form">
                        <input type="text" ref="author" placeholder="author"/>
                        <input type="text" ref="comment" placeholder="comment"/>
                        <input type="submit" hidden/>
                    </form>
                </div>
            );
        }

        return (
            <p>This post has no comments!</p>
        );
    }

    renderComment(comment, i) {
        return (
            <div className="comment" key={i}>
                <p>
                    <strong>{comment.user}</strong>
                    {comment.text}
                    <button onClick={() => this.props.removeComment(this.props.params.postId, i)} className="remove-comment">&times;</button>
                </p>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        const { postId } = this.props.params;
        const author = this.refs.author.value;
        const comment = this.refs.comment.value;

        this.props.addComment(postId, author, comment);
        this.refs.commentForm.reset();
    }
}