const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/', commentsController.postComment);
router.put('/:id', commentsController.editComment);
router.delete('/:id', commentsController.deleteComment);
router.get('/:id', commentsController.getCommentById);
router.get('/', commentsController.getAllComments);

module.exports = router;
