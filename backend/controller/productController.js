//create product
import Product from "../model/productModel.js"
import ErrorHandler from "../helper/hadleError.js";
import APIHelper from "../helper/APIHelper.js";
import HandleError from "../helper/hadleError.js";

export const addProduct = async (req, res) => {
    req.body.user = req.user._id

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    })
}

//get multiple product  http://localhost:6663/api/v1/products?keyword="samsung"
//http://localhost:6663/api/v1/products?keyword=Laptopconsole.log(req.params.keyword);

export const getAllproduct = async (req, res, next) => {
    try {

        const resultPerPage = 4;
        const apiHelper = new APIHelper(Product.find(), req.query).search().filter();//1.Automation construct....2. send pannum multiple fuction chain
        const products = await apiHelper.query;//search and filter

        const filtered = apiHelper.query.clone();//total number of product after search and filter
        const productcount = await filtered.countDocuments();//countDocuments() DB methods to how many product after search and filter
        const totalPage = Math.ceil(productcount / resultPerPage);
        const page = Number(req.query.page) || 1;

        if (totalPage > 0 && page > totalPage) {
            return next(new ErrorHandler("this page does not exist ", 404));

        }

        apiHelper.pagination(resultPerPage);
        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products,
            productcount,
            resultPerPage,
            totalPage,
            currentPage: page
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

//single product
export const singleProduct = async (req, res, next) => {

    console.log(req.params.id);

    const id = req.params.id;

    const singleProduct = await Product.findById(id);

    if (!singleProduct) {

        //  return res.status(500).json({ success: false, "message": " Server is Successfull single not products" })
        return next(new ErrorHandler("Product not found Karthikeyan", 404));
    }
    return res.status(200).json({ "message": " Server is Successfull single products", singleProduct })



}
// update product
export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const singleProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        }
        );

        console.log(singleProduct)

        if (!singleProduct) {
            // return res.status(404).json({   success: false,   message: "Product not found" });
            return next(new ErrorHandler("Product not found ", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: singleProduct
        });

    } catch (error) {
        /*  return res.status(500).json({
               success: false,
               message: error.message
           });*/
        return next(new ErrorHandler(error.message, 500));

    }
};

//deleteProduct

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const singleProduct = await Product.findByIdAndDelete(id);

        if (!singleProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product delete successfully",

        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//addPRoductReview
export const createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body;

        // ✅ User check
        if (!req.user) {
            return next(new HandleError("User not authenticated", 401));
        }

        // ✅ Rating validation
        if (!rating || isNaN(rating)) {
            return next(new HandleError("Valid rating required", 400));
        }

        // ✅ Find product
        const product = await Product.findById(productId);

        if (!product) {
            return next(new HandleError("Product Not Found", 404));
        }

        // ✅ IMPORTANT FIX (prevent undefined error)
        if (!product.reviews) {
            product.reviews = [];
        }

        const reviewData = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };

        // ✅ Check existing review
        const reviewExists = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        );

        if (reviewExists) {
            // 🔄 Update review
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = Number(rating);
                    rev.comment = comment;
                }
            });
        } else {
            // ➕ Add review
            product.reviews.push(reviewData);
        }

        // ✅ Update review count
        product.numOfReviews = product.reviews.length;

        // ✅ Recalculate rating
        let sum = 0;
        product.reviews.forEach((rev) => {
            sum += rev.rating;
        });

        product.rating =
            product.reviews.length > 0
                ? sum / product.reviews.length
                : 0;

        // ✅ Save without validation issues
        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        next(error);
    }
};

//review view
export const viewProductReview = async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new HandleError("Product not Found", 400));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
}



//deleteReview check
export const adminDeleteReview = async (req, res, next) => {
  try {
    const { productId, id } = req.query;

    // 1. Check inputs
    if (!productId || !id) {
      return next(new HandleError("ProductId and ReviewId required", 400));
    }

    // 2. Find product
    const product = await Product.findById(productId);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    // 3. Check review exists
    const reviewExists = product.reviews.some(
      (r) => r._id.toString() === id.toString()
    );

    if (!reviewExists) {
      return next(new HandleError("Review not found", 404));
    }

    // 4. Delete review
    const updatedReviews = product.reviews.filter(
      (r) => r._id.toString() !== id.toString()
    );

    // 5. Recalculate rating
    let sum = 0;
    updatedReviews.forEach((r) => {
      sum += r.rating;
    });

    product.reviews = updatedReviews;
    product.numOfReviews = updatedReviews.length;
    product.rating =
      updatedReviews.length === 0 ? 0 : sum / updatedReviews.length;

    // 🔥 IMPORTANT: use save (NOT findByIdAndUpdate)
    await product.save();

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });

  } catch (error) {
    console.log(error); // debug
    next(error);
  }
};
//allProductViewADMIN
export const getAllproductByAdmin = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products })
}



