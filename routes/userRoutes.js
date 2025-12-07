const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const passport = require('passport');
const { storeReturnTo } = require('../middleware'); // Use object destructuring
const users = require('../controllers/user');

//Middleware for validation
// const validateUser = (req, res, next) => {
//     storeReturnTo(req, res, () => {
//         passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'})(req, res, next);
//     });
// };

//routes for register
router.get('/register', users.renderRegisterForm)

router.post('/register', catchAsync(users.register));

//route for login
router.get('/login', users.renderLoginForm);

router.post('/login', storeReturnTo, passport.authenticate('local', {
    failureFlash: true, 
    failureRedirect: '/login',
    keepSessionInfo: true
}), users.login)

//logout route
// router.get('/logout', (req, res, next) => {
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         req.flash('success', 'Goodbye!');
//         res.redirect('/campgrounds');
//     });
// });

router.get('/logout', users.logout);

module.exports = router;