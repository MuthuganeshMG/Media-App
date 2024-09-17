const express =require ('express');
const { createPost, deletePost, getPost, like_dislike_Post, timeline, updatePost } = require('../controllers/PostController');
const router = express.Router();

router.post('/',createPost );
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like_dislike', like_dislike_Post);
router.get('/:id/timeline', timeline);

module.exports = router;