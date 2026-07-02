import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {

  const [rating,setrating] = useState(product?.rating || 0);
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100 w-72">

      <Link to={`/product/${product?._id}`} className="block group">

        {/* Image */}
        <div className="h-52 overflow-hidden bg-gray-100">
          <img
            src={product?.images?.[0]?.url}
            alt={product?.name}
            className="h-full w-full object-cover group-hover:scale-105 transition"
          />
        </div>
        

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product?.name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product?.description}
          </p>
        </div>
      </Link>

      {/* Bottom Section */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        
        <div className="flex items-center justify-between">
          <Rating value={rating}  onRatingChange = {(r) => setrating(r)}/>

          <span className="text-sm text-gray-600">
            ({product?.numOfReviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            ₹{product?.price}
          </span>

          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;