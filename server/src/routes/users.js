import express from 'express';
import {
  deleteUser,
  getUser,
  like,
  subscribe,
  unlike,
  unsubscribe,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../util/util.js';

const router = express.Router();

//update user
router.put('/:id', verifyToken, updateUser);

//delete user
router.delete('/:id', verifyToken, deleteUser);

//get a user
router.get('/find/:id', getUser);

//subscribe a user
router.put('/subscribe/:id', verifyToken, subscribe);

//unsubscribe a user
router.put('/unsubscribe/:userId', verifyToken, unsubscribe);

//like a user
router.put('/like/:userId', verifyToken, like);

//unlike a user
router.put('/unlike/:userId', verifyToken, unlike);

export default router;
