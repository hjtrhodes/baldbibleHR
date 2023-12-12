const mongoose = require("mongoose");
const User = require("../models/user");

const USERS = require("./user_data");

const mongoDbUrl = process.env.mongoDbUrl || "mongodb+srv://team3-baldbible:Baldmakers2023@bald-bible-database.vqxy3e3.mongodb.net";

// connecting to the database:
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// remove all documents from the databse:
const resetDB = async() => {
    await User.deleteMany({});
};

//insert users to the DB:

const insertUsers = async() => {
    await User.insertMany(USERS);
};

// return list of users:
const findUser = async() => {
    const users = await User.find({});
    return users
};

// main seed function:
const seedDB = async() => {
    await resetDB();
    await insertUsers();
    process.kill(0)
};

seedDB();