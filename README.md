# BALD BIBLE

- Project Timeline: 8 days to MVP
- Main Language: Javascript
- Tech Stack: React, Express, Node.js, MongoDB
- Testing: Cypress, Jest
- Other Technologies: Cloudinary, Bcrypt, CSS, Vite

## Live Deployment
Click here to see the deployment: [Bald Bible](https://baldbible-s8q0.onrender.com/)

## Functionality Demo - Opens on Youtube
[![Video](https://img.youtube.com/vi/RZVKPn00WF8/0.jpg)](https://www.youtube.com/watch?v=RZVKPn00WF8&t=61s)

## Project Description
BaldBible is my final Makers project. It was created working in a team of 4 Software Developers and 2 Quality Engineers. The idea for the app came from my own experiences of hair loss and feeling that there should be a more obvious alternative to the hair loss prevention industry to help individuals embrace this natural change. The process of pitching, discussing and communicating the importance of this idea and having the rest of my developers choose it as the final project was very personal and gratifying to me, as was the process of creating it. After conception and discussion Bald Bible became a Pinterest style, hair loss positivity website leveraging the power of images to inspire users to be more accepting of themselves.

### Planning: Excalidraw, Wireframes and Componentry
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

## Challenges/Actions we took to overcome

Cloudinary:
- Cloudinary was difficult to initialise in the project, particularly the image upload which was causing errors, not automatically rerendering the image feed and not all devs were able to upload in their local envs.
- To move past this I pair programmed with the dev responsible for the image upload and we worked throught the cloudinary documentation and set up together. As a team we knowledge shared how this worked and communicated on how to setup our local envs and Cloudinary accounts with .config to ensure all could upload in the local dev environment. 

Likes:
- My initial method of creating likes functionality was overcomplicated and involved mulitple fetch requests to the backend. I discussed this with the team and we created the more appropriate solution that each post object has an array of userIds which represent the likes and are triggered to be added/removed onClick, then the likes amount is displayed as the length of that array.

Test Suite
- Setting up a test database which could be used separately in the local env and not effect the main database was initially causing errors. I had to conduct research around this in order to created the correct settings for the connection in the codebase and communicate this to the QE's who could then use the correct syntax in their tests to ensure any backend testing was utilising the correct database. 

Image Feed
- We had a lot of discussion over the creation of the image feed as it is the main website feature - How should it look? What is the best means of creating it? We settled on using an external library (MUI) to help us structure it correctly and then assigned a dev to implement this and test it using hardcoded images (later we deleted these once the Cloudinary upload was working). 

Merge Conflicts
- Inevitably on a small project such as this we did suffer from merge conflicts. We had a clear system for version control - pull, setup your branch, regular commits, before you push - pull the latest changes and merge them with your branch, once pushed create a pull request which must be checked and approved by another dev. Despite this we had issues with conflicts in package.lock.json and when devs were working in the same component. We moved past this using regular communication, pair programming and often solving the merge conflicts together using the VSCode merge editor before we pushed to GitHub.

Communication
- Due to the tight timeline the team did experience a difficult moment, we had an issue where two devs had picked up the same ticket but had not moved it on the Trello Board and ended up creating different solutions to a problem. Ultimately the issue here was not following the Agile process and a breakdown in communicatiomn. To solve this the other devs became involved as we discussed what had gone wrong, how to ensure it didn't happen again and which solution to move forward with for the project.
  
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
