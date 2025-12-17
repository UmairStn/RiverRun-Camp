if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { wrap } = require('module');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const localStrategy = require('passport-local');
const helmet = require('helmet');
const MongoStore = require('connect-mongo').default;
// const mongoSanitize = require('express-mongo-sanitize');

const User = require('./models/user');
const campgroundsRoutes = require('./routes/camgroundsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const userRoutes = require('./routes/userRoutes');
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');

// Define these at the top with other constants
const dbUrl = process.env.DB_URL
const SECRET = process.env.SECRET
// const dbUrl = 'mongodb://127.0.0.1:27017/river-run-camp';
// const secret = process.env.SECRET || 'magicword';

const app = express();
app.set('query parser', 'extended');

async function connectToDatabase(){
    try{
        await mongoose.connect(dbUrl);
        console.log("MONGO CONNECTION OPEN!!");
    } catch (error) {
        console.error("MONGO CONNECTION ERROR!!");
        console.error(error);
    }
}
connectToDatabase();

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// 1. Configure express middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(sanitizeV5({ replaceWith: '_' })); // to restrict noSQL injection attacks

// 2. Session configuration - MUST be before passport
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: SECRET
    }
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false })); // to set various HTTP headers for app security

// 3. Passport configuration - AFTER session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //stotre user in session
passport.deserializeUser(User.deserializeUser()); //get user from session

// 4. Custom middleware for flash - MUST include next()
app.use((req, res, next) => {
    console.log(req.query);
    res.locals.currentUser = req.user; // Add user to locals
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.originalUrl = req.originalUrl; //make originalUrl available in all templates
    next(); // This is critical!
});

app.get('/fake', async(req, res) => {
    const user = new User ({email: 'fake@example.com', username: 'fakeUser'});
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

// 5. Routes
app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

app.get('/', (req, res) => {
    res.render('home')
})

app.all(/(.*)/,(req, res, next)=>{
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'SOMTHING WROMG!!!' } = err;
    console.error(err);
    console.error(err.stack);
    res.status(statusCode).render('error', { err });
})

const port = process.env.PORT || 3000;
app.listen(port, (req, res)=>{
    console.log(`Server is running on port ${port}`);
})