const mongoose = require('mongoose');
const uniqid = require('uniqid');

const Post = mongoose.model('Post');

exports.createPost = async(req, res) => {
    const post = await (new Post({
        id: uniqid(),
        caption: req.body.caption,
        photo: req.body.image,
        likes: 0,
        comments: []
    })).save();

    res.end(JSON.stringify(post));
}

exports.getPosts = async (req, res) => {
    const posts = await Post.find();

    res.json(posts);
}

exports.postComment = async (req, res) => {
    const { id, author, comment } = req.body;
    const post = await Post.findOneAndUpdate({ id },  {$push: { comments: { text: comment, user: author }}}, { new: true, runValidators:true });

    res.end(JSON.stringify({'success' : 'Updated Successfully', 'status' : 200}));
}

exports.increaseLikes = async(req, res) => {
    const { id, likes } = req.body;
    const post = await Post.findOneAndUpdate({ id },  {$set: { likes: likes + 1 }}, { new: true, runValidators:true });

    res.end(JSON.stringify({'success' : 'Updated Successfully', 'status' : 200}));
}