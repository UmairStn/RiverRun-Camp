const express = require('express');
const router = express.Router({mergeParams: true}); // to access :id from parent route
const reviews = require('../controllers/review');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateReview, isReviewAuthor } = require('../middleware');


//review route
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//review delete
router.delete('/:reviewID',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;