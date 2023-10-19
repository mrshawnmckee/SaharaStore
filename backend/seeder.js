import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from 'colors';
import users from "./data/users.js";
import products from "./data/products.js";
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js'

// This file is 

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();   //If nothing passed in it will delete everything
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users);       //Will insert the users from the /data/users.js file and return that array of users to this variable

        const adminUser = createUsers[0]._id;                   //Creates a var of the admin user

        const sampleProducts = products.map((product) => {      //takes the products and gives admin user s the user and for each
            return { ...product, user: adminUser };
        })

        await Product.insertMany(sampleProducts);               //inserts the products into the model

        console.log("Data imported!".green.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);                                        //process exit(1) will kill the process
    }
}

const destryData = async () => {                //This destroy all of the data in the DB
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
};

// THis if is making so that we can run the file to get import and to destroy we use -d
if (process.argv[2] === '-d'){
    destryData();
} else {
    importData();
}

//TO run the file, node backend/seeder, to run the destroy command it is node backend/seeder -d
// But instead, we are creating a script to run in in package.json, under scripts>"dev"
//     "data:import": "node backend/seeder.js",
// "data:destroy": "node backend/seeder.js -d"
// SO now we just have to run "npm run data:import" or "npm run data:destroy"