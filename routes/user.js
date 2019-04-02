const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.post('/login',userController.login);
router.post('/signup', userController.signup);
router.put('/:id', userController.updateUser);
router.get('/',userController.getUsers);

module.exports = router;
