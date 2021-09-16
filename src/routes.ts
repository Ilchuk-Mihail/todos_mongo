import express from 'express';
import item from './controller/item'

const router = express.Router();

router.route('/items')
  .post(item.createItem)

export default router