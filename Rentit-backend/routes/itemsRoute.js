const express = require('express');
const router = express.Router();
const {
  getItemDetails,
  getItems,
  deleteItem,
} = require('../controllers/itemsPageContoller');
// const { route } = require('./userRoute');

router.route('/').get(getItems);
router.route('/:id').get(getItemDetails);
router.route('/:id/:user/:type').delete(deleteItem);

module.exports = router;
