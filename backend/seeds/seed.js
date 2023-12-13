const mongoose = require("mongoose");
const User = require("../models/user");
const USERS = require("./user_data");
const { password }  = require('../config');
const signup = require('../controllers/user')
const bcrypt = require('bcrypt') 

const mongoDbUrl = process.env.mongoDbUrl || `mongodb+srv://team3-baldbible:${password}@bald-bible-database.vqxy3e3.mongodb.net/baldbible?retryWrites=true&w=majority`;

// Hash all user passwords
const hashPasswords = async (users) => {
  const saltRounds = 10;
  for (let user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (error) {
      console.error(`Error hashing password for user ${user.username}: ${error}`);
      user.password = 'defaultHashedPassword';
    }
  }
  return users;
}
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
const insertUsers = async () => {
  const hashedUsers = await hashPasswords(USERS); // Await the result of hashPasswords
  await User.insertMany(hashedUsers);
};

// return list of users:
const findUser = async() => {
    const users = await User.find({});
    return users
};

// seed function called by npm run seed
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