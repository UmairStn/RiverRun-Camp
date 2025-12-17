const mongoose = require('mongoose');
const Review = require('./review');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

// const opts = {toJSON: {virtuals: true}}; //to include virtuals when we get the data in json format
// //Virtual for thumbnail
// ImageSchema.virtual('thumbnail').get(function(){
//     return this.url.replace('/upload', '/upload/w_200');
// })

//if we want to include virtuals in all the outputs like res.render, res.json etc
//we can add the opts to the main schema
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
})
ImageSchema.virtual('homePage').get(function(){
    return this.url.replace('/upload', '/upload/w_800,h_600,c_fill,q_auto,f_auto');
})

const opts = { toJSON: { virtuals: true } };

const  CampgroundSchema = new Schema({
    title: String,
    images:[ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

//Virtual for popup
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}" class="text-blue-600 hover:underline">${this.title}</a></strong>
    <p class="text-gray-600">${this.description.substring(0, 20)}...</p>`
});

//querry middlewhere
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);