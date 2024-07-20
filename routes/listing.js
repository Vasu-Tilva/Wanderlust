const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const ListingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload= multer({storage});

router
  .route("/")
  // Index route
  .get(wrapAsync(ListingController.index))
  // create route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.CreateListing)
  );
  // .post(, (req, res) =>{
  //   res.send(req.file);
  //   // console.log(req.body);
  // })

// new route
router.get("/newlist", isLoggedIn, ListingController.RenderNewForm);

router
  .route("/:id")
  // show route
  .get(wrapAsync(ListingController.ShowListings))
  //update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing)
  );

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.RenderEditForm)
);

//delete
router.delete(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.deleteListing)
);

module.exports = router;
