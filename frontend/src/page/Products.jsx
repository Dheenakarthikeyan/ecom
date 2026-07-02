import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Product from "../components/Product";
import Pagination from "../components/Pagenation";

import { getProduct, removeErrors } from "../features/product/productSlice";

const categories = [
  "All",
  "Dress",
  "Electronic",
  "Kitchen",
  "Toys",
  "Sports",
  "Appliances",
  "Beauty",
];

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], loading, error, totalPages: reduxTotalPages } = useSelector(
    (state) => state.product
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromURL);

  const productsPerPage = 6;

  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage }));
  }, [dispatch, keyword, currentPage]);

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? products
      : products.filter(
        (item) =>
          item.category?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase()
      );
  }, [products, selectedCategory]);

  const totalPages = reduxTotalPages || Math.ceil(filteredProducts.length / productsPerPage) || 1;

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);

      const newSearchParams = new URLSearchParams(searchParams);
      if (pageNumber === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", String(pageNumber));
      }

      navigate(`?${newSearchParams.toString()}`);
    }
  };

  return (
    <>
      <Navigation />

      <div className="bg-slate-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="bg-white rounded-lg shadow h-fit">
              <div className="border-b px-5 py-4">
                <h2 className="text-xl font-semibold">Categories</h2>
              </div>

              <div className="p-5 space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </aside>

            <section className="lg:col-span-3 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center px-6 py-5">
                <h2 className="text-2xl font-semibold">Our Products</h2>
                <span className="text-gray-500">{filteredProducts.length} Items</span>
              </div>

              {loading ? (
                <div className="py-24 text-center text-xl font-semibold">
                  Loading...
                </div>
              ) : currentProducts.length === 0 ? (
                <div className="py-24 text-center text-gray-500 text-lg">
                  No Products Found
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                  {currentProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              )}
              <div className="flex justify-center">
                {totalPages > 1 && (
                  <div className="pb-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;