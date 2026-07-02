import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import ImageSlice from "../components/ImageSlice";
import Footer from "../components/Footer";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getProduct,removeErrors } from "../features/product/productSlice";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();

  const { products, productCount, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProduct({keyword:""}));
  }, [dispatch]);

   useEffect(() => {
    if(error){
      toast.error(error.messsage);
      dispatch(removeErrors())
    }
  }, [dispatch,error]);


  console.log(products);

  return (
    <>
      <PageTitle title="Home | E-Commerce" />
      <Navigation title="Home | E-Commerce" />
      <ImageSlice title="Home | E-Commerce" />

      <div className="mt-12 p-8 flex flex-col items-center text-center text-gray-600">
        <h1 className="text-4xl font-semibold mb-8 text-blue-700">
          Latest Collections
        </h1>

        {loading ? (
        <Loading/>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;