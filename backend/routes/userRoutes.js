import express from "express";
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
} from '../controllers/userController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

// with the router.route, it can go to multile options from the base url(/api/users), ex if .get(this command).put(if put do this command)
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);      //protect is the middleware from authMiddleware file
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser)

export default router;

// Connect this to server.js