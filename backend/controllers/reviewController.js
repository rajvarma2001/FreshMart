// import Review from "../model/Review.js";
// import Product from "../model/Product.js";


// const updateProductRating = async (productId) => {
//   const reviews = await Review.find({ product: productId });

//   const numReviews = reviews.length;

//   const avgRating =
//     numReviews > 0
//       ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews
//       : 0;

//   await Product.findByIdAndUpdate(productId, {
//     rating: Number(avgRating.toFixed(1)),
//     numReviews,
//   });
// };

// // Add Review
// export const addReview = async (req, res) => {
//   try {
//     const { product, rating, comment } = req.body;

//     const review = await Review.create({
//       user: req.user._id,
//       product,
//       rating,
//       comment,
//     });

//     // Update product rating
//     const allReviews = await Review.find({ product });
//     const averageRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0) / allReviews.length;
    
//     await Product.findByIdAndUpdate(product, {
//       rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
//     });

//     res.status(201).json({
//       success: true,
//       message: "Review added successfully",
//       review,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to add review",
//       error: error.message,
//     });
//   }
// };

// // Get Reviews of a Product
// export const getProductReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({
//       product: req.params.productId,
//     }).populate("user", "name email");

//     res.status(200).json({
//       success: true,
//       count: reviews.length,
//       reviews,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch reviews",
//       error: error.message,
//     });
//   }
// };

// // Update Review
// export const updateReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;

//     const review = await Review.findById(req.params.reviewId);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     review.rating = rating;
//     review.comment = comment;

//     await review.save();

//     // Update product rating
//     const allReviews = await Review.find({ product: review.product });
//     const averageRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0) / allReviews.length;
    
//     await Product.findByIdAndUpdate(review.product, {
//       rating: Math.round(averageRating * 10) / 10,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Review updated successfully",
//       review,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update review",
//       error: error.message,
//     });
//   }
// };

// // Delete Review
// export const deleteReview = async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.reviewId);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     const productId = review.product;

//     await Review.findByIdAndDelete(req.params.reviewId);

//     // Update product rating
//     const allReviews = await Review.find({ product: productId });
    
//     if (allReviews.length > 0) {
//       const averageRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0) / allReviews.length;
//       await Product.findByIdAndUpdate(productId, {
//         rating: Math.round(averageRating * 10) / 10,
//       });
//     } else {
//       // Reset rating if no reviews left
//       await Product.findByIdAndUpdate(productId, {
//         rating: 0,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete review",
//       error: error.message,
//     });
//   }
// };

// const updateProductRating = async (productId) => {
//   const reviews = await Review.find({ product: productId });

//   const numReviews = reviews.length;

//   const avgRating =
//     numReviews > 0
//       ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews
//       : 0;

//   await Product.findByIdAndUpdate(productId, {
//     rating: Number(avgRating.toFixed(1)),
//     numReviews,
//   });
// };


import Review from "../model/Review.js";
import Product from "../model/Product.js";

// Helper Function
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });

  const numReviews = reviews.length;

  const avgRating =
    numReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        numReviews
      : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: Number(avgRating.toFixed(1)),
    numReviews,
  });
};

// Add Review
export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      user: req.user._id,
      product,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      comment,
    });

    await updateProductRating(product);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

// Get Reviews of Product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name email");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Update Review
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message,
    });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const productId = review.product;

    await Review.findByIdAndDelete(req.params.reviewId);

    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};