import Order from "../model/orderModel.js";
import HandleError from "../helper/hadleError.js";

//neworderCreate
export const createNewOrder = async (req, res) => {
  try {
    console.log("USER:", req?.user); // 🔥 debug

    const {
      shippingAddress,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    const order = await Order.create({
      shippingAddress,
      orderItems,
      paymentInfo: {
        id: paymentInfo?.id || "",
        status: paymentInfo?.status || "pending"
      },
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),

      // 🔥 FIX HERE
      user: req.user?._id
    });

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//singleOrder detailsonluadin see
export const getOrderDetails = async (req, res,next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price image");

    if (!order) {
     
       return next( new HandleError("order not found",400))
      
    
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//adminGetAllOrderDetails
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price image");

       if (!orders){
     
       return next( new HandleError("order not found",400))
      
    
    }
       let totalAmount;
     totalAmount = orders.forEach((order) => (totalAmount += order.totalPrice))

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,totalAmount
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "name price image");

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new HandleError("Order not found", 404));
    }

    // Only allow delete if order is delivered
    if (order.orderStatus !== "Delivered") {
      return next(
        new HandleError("Order must be delivered before deletion", 400)
      );
    }

    await order.deleteOne({id:req.params.id});

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ADMIN: update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id);

    if (!order) {
      return next(new HandleError("Order not found", 404));
    }

    // already delivered check
    if (order.status === "Delivered") {
      return next(
        new HandleError("This order is already delivered", 400)
      );
    }

    // update stock only if moving to Delivered
    if (req.body.orderStatus === "Delivered") {
      await Promise.all(//allrequestUpdate
        order.orderItems.map((item) =>
          updateQuantity(item.product, item.quantity)
        )
      );

      order.deliveredAt = Date.now();
    }

    order.orderStatus = req.body.status;

    if( order.orderStatus === "Delivered"){
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  product.stock -= quantity;

  // prevent negative stock
  if (product.stock < 0) {
    product.stock = 0;
  }

  await product.save({ validateBeforeSave: false });
}
