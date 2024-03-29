# Inno-R2-Virtuaalikuntoutus-K22

## About this project

[A web-application](https://web-sls-test-tool.rahtiapp.fi/) utilising webcam to calculate, analyse and record the knee angle while performing a single leg squat. Made as a part of Metropolia UAS Innovation Project.

This README contains brief explanation how to install/start developing and what technologies are used in this project. This README will be updated if something changes/updates.

## Technologies used

#### Frontend: React, Mediapipe 

#### Backend: Node.js, MongoDB

### Dependency installation

In terminal use these commands (make sure that you are in project root):

` cd frontend && npm install ` and then ` cd ../backend && npm install `

#### Backend/Database

This project uses MongoDB as database.

create new file called ".env" in backend folder. In that file you need to define database information like this:

` "MONGODB_URI= your database connection " ` this contains database information which is used to connect to the database 

` "PORT=3001" ` port where backend is running

### Usage

In terminal from project root:

` Frontend: cd frontend && npm start `

` Backend: cd backend && npm start dev `

For more information, refer to [project Wiki](https://github.com/ristoml/Inno-R2-Virtuaalikuntoutus-K22/wiki)
