const comments = (state = [], action) => {
    if(action.postId) {
        return {
            ...state,
            [action.postId]: postComments(state[action.postId], action)
        };
    }
    
    return state;
}

const postComments = (state = [], action) => {    
    switch(action.type) {
        case "ADD_COMMENT":
            return [...state, {  
                user: action.author,
                text: action.comment
            }];
        case "REMOVE_COMMENT":
        return [
            ...state.slice(0, action.index),
            ...state.slice(action.index + 1)
          ];
        default:
            return state;
    }
}

export default comments;