import mongoose from "mongoose";

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price"],
        maxLenght: [7, "digtial "]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: [true]
            },
            url: { type: String, required: [true] }
        }
    ],
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "please enter product Stock"],
        default: 1
    },
    numOffReview: {
        type: Number,
        default: 0
    },
    review: [
      
        { name: { type: String, required: true } },
        { rating: { type: Number, required: true } },
        { comment: { type: String, required: true } },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("Product", productScheme);

