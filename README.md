# BALD BIBLE

## Live Deployment
Click here to see the deployment: [Bald Bible](https://baldbible-s8q0.onrender.com/)

## Functionality Demo - Opens on Youtube
[![Video](https://img.youtube.com/vi/RZVKPn00WF8/0.jpg)](https://www.youtube.com/watch?v=RZVKPn00WF8&t=61s)

## Project Description
BaldBible is my final Makers project. It was created working in a team of 4 Software Developers and 2 Quality Engineers. The idea for the app came from my own experiences of hair loss and feeling that there should be a more obvious alternative to the hair loss prevention industry to help individuals embrace this natural change. The process of pitching, discussing and communicating the importance of this idea and having the rest of my developers choose it as the final project was very personal and gratifying to me, as was the process of creating it. After conception and discussion Bald Bible became a Pinterest style, hair loss positivity website leveraging the power of images to inspire users to be more accepting of themselves.

- Project Timeline: 8 days to MVP
- Tech Stack: Reactjs, Express, Nodejs, MongoDB
- Testing: Cypress, Jest

### Planning: Excalidraw/Figma Wireframes and Componentry
![Planning Phase](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708419913/Demo%20Videos/BaldBiblePlanning_j14kes.png "Planning Phase")

### Agile Working using Trello
![Trello Board](https://res.cloudinary.com/dut4qf1bt/image/upload/v1708420684/Demo%20Videos/BaldBibleTrello_ezvxtl.png "Trello Board")



## Final Acheived MVP Functionality:
- Login: Must be unique email and correct password
- Signup: All fields must be completed, email must be correct format, password must be certain length and contain special character
- Password Security: Passwords are bcrypt hashed on signup before being stored in database
- Dynamic page elements - buttons, login/signup, Feed Page
- Image Feed - Each picture is clickable to see content
- Security - User cannot comment/like without being logged in
- Responsive - Whole web app is responsive to different screen sizes
- Image Upload - Cloudinary Image upload and storage, images automatically display on the feed on upload
- Comments - conditionally render on button click, can also be deleted if user matches comment UserId
- Likes - User can like/unlike an image
- Testing - Test database setup and connected, frontend and api tests in place

#### My responsibilities:
Project setup:
- Leading initial planning/discussions around idea conception and wireframing using Excalidraw and Figma
- Initialising frontend, ensuring correct endpoint for api and testing connections
- Initialising cloud hosted database (using MongoDB Atlas) and troubleshooting local env connections for all Devs
- Creating test database and creating test connection that would not interfere with general running of the app
- Creating Trello board and initial tickets

Project Sprints:
- Individual responsibilities: Login, Signup, Password Security, Images being clickable buttons, styling, Likes
- Supported others by pair programming on: Comments, Image Upload
- Project managing - we rotated the responsibility to lead standups/retros

Other:
- Personal Deployment of project

## Challenges and actions to overcome
- Cloudinary
- Conflict
- Likes
- Test Suite
- Image Feed
- Merge Conflicts

## Local env setup for Bald Bible
### Run Bald Bible in dev mode
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

### MongoDB database password
Add a `config.js` file in the backend and add this to `.gitignore`.
Add the MongoDB password to `config.js`.
```
module.exports = {
  password: 'db-user-password' 
} 
```
