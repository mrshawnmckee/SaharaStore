import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

// @desc Create New Order
// @route POST api/orders
// @access Private
const addOrderItems = asyncHandler (async (req, res) => {
    //Getting data from the body from the frontend
  const { 
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

//   Checking to see if there is an orderItems array already, and if it is empty
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order ({
        // orderItems (in order model)has name, etc already passed in, but product is not, so we must map through the name, qty, image and price
        // which will be a spread operator (...x), and tehn add product object id, which we get with x._id
        // Then set ._id to undefined, the product will be the id
        orderItems: orderItems.map((x) => ({
            ...x, 
            product: x._id,
            _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }

  
});

// @desc Get logged in user orders
// @route GET api/orders/myorders
// @access Private
const getMyOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    // Also adding username and id to the order with populating name and email from the user collection
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found')
    }

  });
  
// @desc Update order to paid
// @route GET api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler (async (req, res) => {
    res.send('update order to paid')
});

// @desc Update order to delivered
// @route GET api/orders/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler (async (req, res) => {
    res.send('update order to delivered')
});

// @desc Get all orders
// @route GET api/orders
// @access Private/Admin
const getOrders = asyncHandler (async (req, res) => {
    res.send('get all orders')
});
  
export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}