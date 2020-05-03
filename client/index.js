import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';

import css from './styles/style.styl';
import rootReducer from './reducers/index';

import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';
import PostForm from './components/PostForm';

if(module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
        this.store = null;
        this.history = null;
    }

    fetchData () {
        axios.get('/api/posts')
        .then((response) => {
            const posts = response.data;
            const comments = {}

            posts.forEach((post) => { 
                comments[post.id] = post.comments; 
                delete post.comments;
            });

            this.store = createStore(rootReducer, { posts, comments });
            this.history = syncHistoryWithStore(browserHistory, this.store);
                
            this.setState({ isLoading: false })
        })
        .catch((error) => console.log(error));
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        const { isLoading } = this.state;

        return (
            isLoading ?
                <span></span>
            :
            (<Provider store={this.store}>
                <Router history={this.history}>
                    <Route path='/' component={App}>
                        <IndexRoute component={PhotoGrid}></IndexRoute>
                        <Route path='/view/post' component={PostForm}></Route>
                        <Route path='/view/:postId' component={Single}></Route>
                    </Route>
                </Router>
            </Provider>)
        )
    }
}

render(<Main/>, document.querySelector('#root'));