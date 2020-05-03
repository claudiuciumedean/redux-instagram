  
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    id: {
        type:String,
    },
    caption: {
        type: String
    },
    likes: {
        type: Number        
    },
    photo: {
        type: String,
        required: 'Please enter a photo!'
    },
    comments: [{   
        user: {
            type: String,
            required: 'Please enter a username!'
        },
        text: {
            type: String,
            required: 'Please enter a comment!'
        }
    }]
});

module.exports = mongoose.model('Post', postSchema);