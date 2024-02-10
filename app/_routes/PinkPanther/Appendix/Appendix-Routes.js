const express = require('express');
const { getAppendixs, createAppendix, updateAppendix, deleteAppendix } = require('./Appendix-Controller');
const router = express.Router();

router.route('/').get(getAppendixs).post(createAppendix).put(updateAppendix).delete(deleteAppendix);

module.exports = router;

// This is linked to JWT and auth user can only make changes
// The auth is to determine which roles can do what.
// const { protect, authorize } = require('../../middleware/authorisationHelper');

// router.route('/').get(getAppendixs).post(protect, authorize('staff', 'admin'), createAppendix);