const express = require('express');
const { getAppendixs, getAppendix, createAppendix, updateAppendix, deleteAppendix } = require('./Appendix-Controller');
const router = express.Router();

router.route('/').get(getAppendixs).post(createAppendix);
router.route('/:id').get(getAppendix).put(updateAppendix).delete(deleteAppendix);

module.exports = router;
