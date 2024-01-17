# Bald Bible

BaldBible is my final Makers project. It is an idea that I pitched after experiencing hair loss and feeling that there should be a more obvious alternative to the hair loss prevention industry. As a result it is a pinterest style, hair loss positivity website leveraging the power of images to imspire users to be more accepting of themselves.

The main focus was working with images using Cloudinary. Other functionality includes having a responsive feed page, image upload, login/signup, likes and comments. Built in 2 weeks using AGILE methodology.


## Run Bald Bible in dev mode
Start the frontend and backend servers together.
```
cd backend
npm start
```
Start the frontend server only.
```
npm run dev
```
Start the backend server only.
```
npm run backend
```

## MongoDB database password
Add a `config.js` file in the backend and add this to `.gitignore`.
Add the MongoDB password to `config.js`.
```
module.exports = {
  password: 'db-user-password' 
} 
```
