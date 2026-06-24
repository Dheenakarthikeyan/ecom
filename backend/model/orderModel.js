import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
      phoneNo: { type: String, required: true }
    },

    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        }
      }
    ],

    orderStatus: {
      type: String,
      required:true,
      default: "Processing"
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // FIXED: paymentInfo should NOT be required
    paymentInfo: {
      id: { type: String, default: "" },
      status: { type: String, default: "pending" }
    },

    // FIXED: should NOT be required at creation time
    paidAt: {
      type: Date,
      default: null
    },

    itemPrice: {
      type: Number,
      required: true,
      default: 0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },

    deliveredAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);