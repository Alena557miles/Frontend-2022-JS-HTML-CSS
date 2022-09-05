const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { getUser, deleteUser, updateUser } = require('../controllers/userController');

router.get('/me', authMiddleware, getUser);
router.delete('/me', authMiddleware, deleteUser);
router.patch('/me', authMiddleware, updateUser);

module.exports = router;
