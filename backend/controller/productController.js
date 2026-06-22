//create product
import Product from "../model/productModel.js"
import ErrorHandler from "../helper/hadleError.js";
import APIHelper from "../helper/APIHelper.js";
import HandleError from "../helper/hadleError.js";

export const addProduct = async (req, res) => {
    req.body.user =  req.User._id

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


export const createProductReview = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new HandleError("User not authenticated", 401));
        }

        const { rating, comment, productId } = req.body;

        if (!rating || !productId) {
            return next(new HandleError("Rating and Product ID required", 400));
        }

        if (rating < 1 || rating > 5) {
            return next(new HandleError("Rating must be between 1 and 5", 400));
        }

        const product = await Product.findById(productId);

        if (!product) {
            return next(new HandleError("Product not found", 404));
        }

        const reviewExist = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        );

        if (reviewExist) {
            reviewExist.rating = Number(rating);
            reviewExist.comment = comment;
        } else {
            product.reviews.push({
                user: req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment
            });
        }

        product.numOfReviews = product.reviews.length;

        const sum = product.reviews.reduce((acc, rev) => acc + rev.rating, 0);

        product.rating = product.reviews.length ? sum / product.reviews.length : 0;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Review added/updated successfully",
        });

    } catch (error) {
        next(error);
    }
};