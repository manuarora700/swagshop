import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc: create new order
// @route: POST /api/orders
// @access: Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error(`No order items!`);
  } else {
    const order = new Order({
      orderItems,
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

// @desc: Get Order by ID
// @route: GET /api/orders/:id
// @access: Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    res.status(404);
    throw new Error(`Order not found!`);
  } else {
    res.status(200).json(order);
  }
});

// @desc: Update order to Paid
// @route: POST /api/orders/:id/pay
// @access: Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error(`Order not found!`);
  } else {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      emailAddress: req.body.payer.emailAddress,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
