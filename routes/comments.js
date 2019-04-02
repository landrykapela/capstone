const express require('express');

const router = express.Router();
const commentController = require('../controllers/comments');

router.post('/comments',commentsController.postComment);
router.post('/comments/:id', commentsController.getReplyComment);
router.put('/comments/:id', commentsController.EditComment);
router.delete('/comments/:id', commentsController.deleteComment);
router.get('/comments/:id', commentsController.getCommentById);
router.get('/comments', commentsController.getAllComments);

module.exports = router;
