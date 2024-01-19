const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key';

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://root:yourpassword@localhost:27017", { dbName: 'SocialDB' });

const User = mongoose.model('User', { username: String, email: String, password: String });
const Post = mongoose.model('Post', { userId: mongoose.Schema.Types.ObjectId, text: String });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true, cookie: { secure: false } }));


// code for authenticateJWT Function goes here.

// code for requireAuth Function goes here.

// code of Routing for HTML Files goes here.


// code for User Registration goes here.


// code for User login goes here.


// code for Creating Posts goes here.


// code for Updating Posts goes here.


// code for Deleting Posts goes here.


// code for User Logout goes here.


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
