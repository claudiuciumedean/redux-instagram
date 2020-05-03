import React, { Component } from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

export default class Photo extends Component {
    constructor(props) {
        super(props);
        
        this.state = { imageLoaded: false };

        this.increaseLike = this.increaseLike.bind(this);
    }

    observe() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(({isIntersecting}) => {
                if(!isIntersecting) { return; }
                this.loadImage();
                observer.unobserve(this.refs.figure);
            });
        });

        observer.observe(this.refs.figure);
    }
    
    loadImage() {
        const image = new Image();
        image.src = this.props.post.photo;
        image.onload = (e) => this.setState({ imageLoaded: true }); 
    }

    isInViewport(element) {
        const { top, bottom } = element.getBoundingClientRect();
        return (top > 0 && top <= window.innerHeight) || (bottom > 0 && bottom <= window.innerHeight);
    }

    onScroll() {
        if(!this.state.imageLoaded && this.isInViewport(this.refs.figure)) {
            this.loadImage();
            window.removeEventListener('scroll', this.onScroll.bind(this));
        }
    }

    increaseLike() {
        const { id, likes } = this.props.post;
        axios.post('/api/increase-likes/', { id, likes }).
            then((response) => this.props.increment(this.props.index))
            .catch((error) => console.log(`Network error: ${error}`));
    }

    componentDidMount() {
        if('IntersectionObserver' in window) {
            this.observe();
        } else {
            //Fallback for browsers that don't
            //support IntersectionObsever
            this.onScroll();
            window.addEventListener('scroll', this.onScroll.bind(this));
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

    render () {
        const { post, comments } = this.props;
        return (
            <figure ref="figure" className='grid-figure'>
                <div className='grid-photo-wrap'>
                    <Link to={`/view/${post.id}`} className='grid-photo'>
                        {this.state.imageLoaded ? 
                            <img src={post.photo} alt={post.caption}/> 
                        : 
                            <div className="spinner"></div> 
                        }
                    </Link>

                    {<CSSTransitionGroup
                        component='span'
                        transitionName='like'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        <span key={post.likes} className='likes-heart'>{post.likes}</span>
                    </CSSTransitionGroup>}
                </div>

                <figcaption>
                    <p>{post.caption}</p>
                    <div className='control-buttons'>
                        <button onClick={this.increaseLike} className='likes'>&hearts; {post.likes}</button>
                        <Link className='button' to={`/view/${post.id}`}>
                            <span className='comment-count'>
                                <span className='speech-bubble'></span>
                                {comments[post.id] ? comments[post.id].length : 0}
                            </span>
                        </Link>
                    </div>
                </figcaption>
            </figure>
        );
    }
}