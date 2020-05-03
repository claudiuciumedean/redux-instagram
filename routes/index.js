const express = require('express');
const path = require('path');

const router = express.Router();
const { catchErrors } = require('../helpers/errorHandler');
const { getPosts, postComment, increaseLikes, createPost } = require('../controllers/postController');
const root = path.dirname(require.main.filename);

router.get('/', (req, res) => res.sendFile(path.join(root, 'index.html')));
  
router.get('/view/:postId', (req, res) => res.sendFile(path.join(root, 'index.html')));

router.get('/view/post', (req, res) => res.sendFile(path.join(root, 'index.html')));

router.post('/api/create-post/', catchErrors(createPost));

router.get('/api/posts', catchErrors(getPosts));

router.post('/api/post-comment/', catchErrors(postComment));

router.post('/api/increase-likes/', catchErrors(increaseLikes));

module.exports = router;