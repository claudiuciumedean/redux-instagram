const increment = index => {
    return {
        type: "INCREMENT_LIKES",
        index
    };
}

const addComment = (postId, author, comment) => {
    return {
        type: "ADD_COMMENT",
        postId,
        author,
        comment
    };
}

const removeComment = (postId, index) => {
    return {
        type: "REMOVE_COMMENT",
        index,
        postId
    };
}

export { increment, addComment, removeComment };