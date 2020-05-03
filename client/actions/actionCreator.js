const increment = (index) => ({
    type: 'INCREMENT_LIKES',
    index
});

const addPost = (post) => ({
    type: 'ADD_POST',
    post
})

const addComment = (postId, author, comment) => ({
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
});

const removeComment = (postId, index) => ({
    type: 'REMOVE_COMMENT',
    index,
    postId
});

export { increment, addPost, addComment, removeComment };