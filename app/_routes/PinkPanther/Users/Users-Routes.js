import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './Users-Controller';
const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
