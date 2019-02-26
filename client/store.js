import { createStore, compose } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";

import rootReducer from "./reducers/index";

import comments from "./data/comments";
import posts from "./data/posts";

const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

if(module.hot) {
    module.hot.accept("./reducers", () => {
        const nextRootReducer = require("./reducers/index").default;
        store.replaceReducer(nextRootReducer);
    });
}

const defaultState =  { posts, comments };
const store = createStore(rootReducer, defaultState, enhancers);
const history = syncHistoryWithStore(browserHistory, store);

export { store, history };  
