const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });


// INDEX - Show all campgrounds and Create - Add new campground to DB
//this is a group for same route
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('images'), validateCampground,  catchAsync(campgrounds.createCampground));
    // .post(upload.array('image'), (req, res) => { //image is the name attribute in the form
    //      console.log(req.files);
    //     res.send('It worked!');
    // })

// NEW - Show the form to create a new campground
// IMPORTANT: This '/new' route must come before the '/:id' route below.
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// SHOW - Show details for one specific campground
router.get('/:id', catchAsync(campgrounds.showCamground));

// EDIT - Show the form to edit a campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// UPDATE - Submit the edit form
router.put('/:id', isLoggedIn, isAuthor, upload.array('images'), validateCampground, catchAsync(campgrounds.updateCampground));
//upload.array('images') is a mutler middleware

// DELETE - Delete a specific campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;