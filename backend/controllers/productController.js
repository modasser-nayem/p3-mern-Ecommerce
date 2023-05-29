const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const Errorhandler = require("../utils/errorhandler");

// Get All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
   const resultPerPage = 5;
   const productCount = await Product.countDocuments();
   const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
   const products = await apiFeatures.query;
   res.status(200).json({ success: true, products, productCount });
});

// Get Single Product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      return next(new Errorhandler("Product not found", 404));
   }
   res.status(200).json({
      success: true,
      product,
   });
});

// Create Product == Admin ==
exports.createProduct = catchAsyncError(async (req, res, next) => {
   const product = await Product.create(req.body);
   res.status(201).json({
      success: true,
      product,
   });
});

// Update Product == Admin ==
exports.updateProduct = catchAsyncError(async (req, res, next) => {
   let product = await Product.findById(req.params.id);
   if (!product) {
      return next(new Errorhandler("Product not found", 404));
   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

   res.status(200).json({
      success: true,
      product,
   });
});

// Delete Product == Admin ==
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
   const product = await Product.findById(req.params.id);
   if (!product) {
      return next(new Errorhandler("Product not found", 404));
   }

   await product.remove();

   res.status(200).json({
      success: true,
      message: "Successfully Deleted",
   });
});
