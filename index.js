const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require ('./cities')
const {places, descriptors} = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '60496de4d2a34c160019f247',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point',
                 coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/crackasupreme/image/upload/v1616546221/YelpCamp/tokqpeuzuqxu2bikdowe.jpg',
                  filename: 'YelpCamp/tokqpeuzuqxu2bikdowe'
                }
              ],
            description: 'Mic Check 1 2 what is this',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close() 
})  