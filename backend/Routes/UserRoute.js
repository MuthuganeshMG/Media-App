const express = require("express");
const authMiddleWare = require("../Middleware/authMiddleWare.js");
const { deleteUser, followUser, getAllUsers, getUser, UnFollowUser, updateUser } = require("../controllers/UserController.js");

const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, UnFollowUser);

module.exports = router;