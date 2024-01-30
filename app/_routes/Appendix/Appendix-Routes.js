const express = require('express');
const { getAppendixs, createAppendix, updateAppendix, deleteAppendix } = require('./Appendix-Controller');
const router = express.Router();

router.route('/').get(getAppendixs).post(createAppendix).put(updateAppendix).delete(deleteAppendix);

module.exports = router;
