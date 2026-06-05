const express = require('express');
const router = express.Router();

const { authController, loginController, getUserList } = require('../controllers/user/user');

router.post('/register', authController);
router.post('/login', loginController);
router.get('/users', getUserList);


module.exports = router;
