import express from 'express';
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from '../controllers/videoController.js';
import { verifyToken } from '../util/util.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/find/:id', getVideo);

export default router;
