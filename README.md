# EPS-PRESS
eps-press is an interactive blogging platform for the Environmental Protection and Sanitation club Lafia.

[Live Demo](https://eps-press.herokuapp.com)

![alt screenshot](https://res.cloudinary.com/diibyv2i7/image/upload/v1565238252/eps-press_home.png)

![alt screenshot](https://res.cloudinary.com/diibyv2i7/image/upload/v1565238283/eps-press_profile.png)

## Installations 
```
1 Git clone this repository
2 cd to cloned repo root directory
3 run yarn add to install dependencies
4 run node server.js to start server
5 open another terminal and cd to projects client directory
6 run yarn add to install clients dependencies
7 run yarn start to start client server
8 visit http://localhost:3000 on your browser to view app.
```

## Features
The following features were implemented.

**Authentication & Authorization**

This application uses json web token (jwt) to authenticate and authorize users on both client and server side. When a user succefully logs into the application, a unique jwt with a brief life span is generated on the server and sent to the client, which is stored on the client and must be used for subsequent server calls.

**Role Based Access Control**
The application uses Role Base Access Control to assign rights and privilages to users. 

**Guest**
Unregistered users are able to
- Sign up to the application
- Search for post
- Read posts and comments

**Registered users**
Registered users are able to:
- Login 
- Search and read all posts and comments
- Like, unlike and reply posts and comments
- Create and edit their post and comments
- View other users profile
- View their own  profile and upload avater
- Log out of the application

**Admins**

Administrators enjoys all the rights and privilages of a registered user, and in addition can:
- Edit a users post and comment
- Delete a users post and comment
- change a users avater

## Tech Stack
This application was built with the following technologies:
- React.js: This is a Javascript front-end component base library for building declearative User Interface
- Context API and useReducer hooks for managing application global state
- Reactstrap: Reactstrap provides a prebuilt Bootstrap 4 components that allow a great deal of flexibility, this was use to build beautiful and responsive UI.
- Node.js: Node.js is a server side javascript runtime environment for running javascript on the server.
- Express.js: Express.js is a Node.js framework for builing RESTful apis.
- MongoDb/Mongoose: MongoDB is a cross-platform document oriented NoSQL database use to persist application data.

## Sample enviroment configurations
- SECRET_KEY='mysecrerekey'
- MONGODB_URL='mongodb://'DB_USER':'DB_PASS'@example.mlab.com:6923/epspress'

Find more in the .env.example file