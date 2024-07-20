const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview , isLoggedIn, isReviewAuther, saveRedirectUrl} = require("../middleware.js");

const ReviewController = require("../controllers/review.js");

//reviews
//post route
router.post("/", isLoggedIn,validateReview, wrapAsync(ReviewController.createReview));

// delete route
router.delete("/:reviewId", isReviewAuther,isLoggedIn,wrapAsync(ReviewController.deleteReview));

module.exports = router;