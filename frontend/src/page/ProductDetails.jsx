import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  removeErrors,
} from "../features/product/productSlice";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Calculater, formattedDate } from "../util/formatter";
import Rating from "../components/Rating";
import Loading from "../components/Loader";
import { MessageSquare } from "lucide-react";
import { CalendarDays } from "lucide-react";

const ProductDetails = () => {

  const [useRating, setUserRating] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  const { product, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  // ✅ Set rating after product loads
  useEffect(() => {
    if (product?.rating) {
      setRating(Number(product.rating));
    }
  }, [product]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  const increaseQty = () => {
    if (product?.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  // ✅ FIXED PRICE LOGIC
  const price = Number(product?.price) || 0;
  const mrp = Number(product?.mrp) || price;

  if (loading) return <h1 className="text-center mt-10"><Loading /></h1>;
  if (!product) return <h1 className="text-center mt-10">No Product Found</h1>;
  console.log(product.rating)

  return (
    <>
      <Navigation />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}

        <div className="bg-gray-100 rounded-lg overflow-hidden shadow h-[480px]">
          <img
            src={product?.images?.[0]?.url || "/placeholder.png"}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>


        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2 mb-2">
            <Rating
              value={rating}
              onRatingChange={(r) => setRating(r)}
            />
            <span className="text-gray-600 text-sm">
              ({product?.numOfReviews || 0} Reviews)
            </span>
          </div>

          {/* 💰 Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-green-600">
              ₹{price}
            </span>

            <span className="line-through text-gray-400">
              ₹{mrp}
            </span>

            <span className="text-green-500 text-sm">
              {Calculater(price, mrp)}% OFF
            </span>
          </div>

          {/* 📄 Description */}
          <p className="text-gray-600 mb-4">
            {product?.description}
          </p>

          {/* Stock + Qty */}
          <div className="flex justify-between items-center">
            <p
              className={`font-semibold ${product?.stock > 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>


          </div>

          <div className="flex gap-6 pt-3">
            {/* Quantity Selector */}
            <div className="flex items-center w-fit border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={decreaseQty}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-lg font-semibold"
              >
                −
              </button>

              <span className="w-14 text-center text-lg font-medium">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-lg font-semibold"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            {product?.stock > 0 && (
              <button
                className="w-fit bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Add to Cart
              </button>
            )}
          </div>
          {/* Review */}
          <div>
            {/*Review Form */}
            <form className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare size={22} className="text-blue-600" />
                <h3 className="text-2xl font-semibold">
                  Share Your Feedback
                </h3>
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">
                  Rating
                </label>

                <Rating
                  value={useRating}
                  disable={false}
                  onRatingChange={(r) => setUserRating(r)}
                />
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">
                  Review
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your experience with this product..."
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Post Review
              </button>
            </form>
          </div>
        </div>

        {/*customer review section*/}
        {/* Customer Reviews */}
        <section className="col-span-1 md:col-span-2 mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Customer Reviews
          </h2>

          {product?.reviews?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl border shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={review.avatar || "/placeholder-user.png"}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                      />

                      <div>
                        <h3 className="text-lg font-semibold">
                          {review.name}
                        </h3>

                        <Rating
                          value={review.rating}
                          disable={true}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <CalendarDays size={16} className="text-blue-600" />
                      <span className="font-medium">
                        {formattedDate(review.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="mt-5 text-gray-600 leading-7 border-t pt-4">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-10 text-center">
              <h3 className="text-xl font-semibold text-gray-600">
                No Reviews Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Be the first customer to review this product.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;