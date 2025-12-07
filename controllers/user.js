const User = require('../models/user');


module.exports.renderRegisterForm = (req, res) => {
    if (req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render('../views/users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to RiverRunCamp!');
            
            // Use stored returnTo URL or default to campgrounds
            const redirectUrl = req.session.returnTo || '/campgrounds';
            delete req.session.returnTo; // Clean up session
            res.redirect(redirectUrl);
        });
    } catch (e) {
        // Check for MongoDB duplicate key error (E11000)
        //this is for unique email error handling
        if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
            req.flash('error', 'This email is already registered');
        } else {
            req.flash('error', e.message);
        }
        res.redirect('register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    // Store returnTo in session if provided in query string
    if (req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Successfully logged in!');
    const redirectUrl = req.session.returnTo || '/campgrounds'; // Default redirect URL
    delete req.session.returnTo; // Clean up session
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    // Store current URL before logging out
    const returnUrl = req.query.returnTo || req.headers.referer || '/campgrounds';
    
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect(returnUrl);
    });
}