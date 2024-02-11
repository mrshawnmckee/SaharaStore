import express from "express";
const router = express.Router();

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controllers/orderController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

// with the router.route, it can go to multile options from the base url(/api/users), ex if .get(this command).put(if put do this command)
// Using protect sp taht it is only for registered users
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router;

// Connect this to server.js