const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");

// Place order
router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            // Saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });
            // Clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    // Decode token and extract user ID if not using a middleware
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const orders = await Order.find({ buyer: userId }).populate("products", "-photo").populate("buyer", "name");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get all orders --admin
router.get('/get-all-orders', authenticateToken, async (req, res) => {
    console.log("Request hit: get-all-orders");
    try {
        const ordersData = await Order.find()
            .populate({
                path: "book",
                select: "title desc price"
            })
            .populate({
                path: "user",
                select: "username email" // Optional: populate user details if needed
            })
            .sort({ createdAt: -1 });

        console.log("All Orders Data:", JSON.stringify(ordersData, null, 2));

        return res.json({
            status: "success",
            data: ordersData,
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update order status --admin
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Changed from req.params.id to match route parameter
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: "success",
            message: "Order status updated successfully",
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;