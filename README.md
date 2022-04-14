# Inno-R2-Virtuaalikuntoutus-K22

This README contains brief explanation how to install/start developing and what technologies are used in this project. This README will be updated if something changes/updates.

## Technologies used

#### Frontend: React, Mediapipe 

#### Backend: Node.js, MongoDB

## Developing/installation

First use "clone repository" -function in your code editor and use this URL: https://github.com/ristoml/Inno-R2-Virtuaalikuntoutus-K22.git

### Dependency installation

In terminal use these commands (make sure that you are in project root):

` cd frontend && npm install ` and then ` cd ../backend && npm install `

#### Backend/Database

This project uses MongoDB as database.

create new file called ".env" in backend folder. In that file you need to define database information like this:

` "MONGODB_URI= your database connection " ` this contains database information which is used to connect to the database 

` "PORT=3001" ` port where backend is running

### Usage

In terminal:

` Frontend: npm start `

` Backend: npm start dev `
