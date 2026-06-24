/*import mongoose from "mongoose";

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
  required: true
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
    reviews: [
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    name: String,
    rating: Number,
    comment: String
  }
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

*/
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please enter product description"]
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxlength: [7, "Price cannot exceed 7 digits"]
    },

    rating: {
        type: Number,
        default: 0
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, "Please enter product category"]
    },

    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: {
        type: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true
                },
                name: String,
                rating: Number,
                comment: String
            }
        ],
        default: []   // 🔥 VERY IMPORTANT FIX
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }

},
{
    timestamps: true
}
);

export default mongoose.model("Product", productSchema);