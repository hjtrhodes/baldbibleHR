const mongoose = require("mongoose");
const User = require("../models/user");
const password = require("../config")
const USERS = require("./user_data");

const mongoDbUrl = process.env.mongoDbUrl || `mongodb+srv://team3-baldbible:${password}@bald-bible-database.vqxy3e3.mongodb.net/baldbible`;

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

const seedDB = async () => {
  try {
      await resetDB();
      await insertUsers();
      console.log('Seed completed successfully.');
  } catch (error) {
      console.error('Seed failed:', error);
  } finally {
      process.exit(0);
  }
};

seedDB();