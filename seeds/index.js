const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// const dbUrl =   'mongodb://localhost:27017/yelp-camp';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});

    for(let i = 0; i<300;i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            //your user id mongo
            author: "639bedfabdbd89d0f2e9b4bc",
            city: `${cities[random1000].city}`,
            state: `${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: "https://res.cloudinary.com/dp3gstxka/image/upload/v1671507437/YelpCamp/znhzsmozwx2em0cfoxjt.png",
                filename: 'YelpCamp/znhzsmozwx2em0cfoxjt'

            },
        
            {
                url: 'https://res.cloudinary.com/dp3gstxka/image/upload/v1671507438/YelpCamp/bo543imvtkadioarl016.png',
                filename: 'YelpCamp/bo543imvtkadioarl016'

            }
            ],            
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ",
            price,
            geometry: {
                type: 'Point',
                coordinates: [  cities[random1000].longitude, cities[random1000].latitude, ]
              },
            

        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
    console.log("seeded");
});