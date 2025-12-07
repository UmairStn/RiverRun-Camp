const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const review = require('../models/review');

async function connectToDatabase(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
        console.log("MONGO CONNECTION OPEN!!");
    } catch (error) {
        console.error("MONGO CONNECTION ERROR!!");
        console.error(error);
    }
}
connectToDatabase();


const sample = (array)=>{
    return array[Math.floor(Math.random()*array.length)];
}


const seedDB = async () => {
    // Delete all existing documents from the Campground collection.
    // The 'await' keyword ensures this operation finishes before the next line of code runs.
    await Campground.deleteMany({});

    // Loop 10 times to create 10 new campgrounds.
    for (let i = 0; i < 10; i++) {
        // Generate a random number between 0 and 999 to pick a random city.
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;

        // Create a new Campground object with random data.
        const camp = new Campground({
            author: '68ca9a560aaf75039e94afcb', // Add a fixed author ID for all campgrounds.
            // Set the location using a random city from the 'cities' array.
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            // Set the title using a random descriptor and place from the 'seedHelpers' file.
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum tempora eligendi expedita libero ea ratione tenetur',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dx8ddr35y/image/upload/v1758789252/RiverRunCamp/xvnogxlsfp8maw7u4vlf.jpg',
                    filename: 'RiverRunCamp/xvnogxlsfp8maw7u4vlf'
                },
                {
                    url: 'https://res.cloudinary.com/dx8ddr35y/image/upload/v1758789252/RiverRunCamp/pphrz7ty73qmrilmzro9.jpg',
                    filename: 'RiverRunCamp/pphrz7ty73qmrilmzro9'
                }
            ]
        });

        // Save the newly created campground to the database.
        // The 'await' keyword pauses the loop until the save operation is complete.
        // This ensures that each campground is written to the database one by one.
        await camp.save();
    }
};
seedDB().then(()=>{
    mongoose.connection.close();
})