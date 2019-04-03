const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/',auth, commentsController.postComment);
router.put('/:id',auth, commentsController.editComment);
router.delete('/:id', auth, commentsController.deleteComment);
router.get('/:id', auth, commentsController.getCommentById);
router.get('/', auth, commentsController.getAllComments);

module.exports = router;
