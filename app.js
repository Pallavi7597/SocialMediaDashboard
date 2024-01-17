const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;
const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use express-session middleware
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

// Sample data (you might use a database in a real application)
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
];

let posts = [
  { id: 1, userId: 1, text: 'Post 1 by User 1' },
  { id: 2, userId: 2, text: 'Post 1 by User 2' },
];

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to authenticate users with JWT
function authenticateJWT(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to render the post form
app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

// Register a new user and generate a JWT token
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }

  if (users.some((user) => user.username === username || user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password, // In a real application, you would hash the password before storing it
  };

  users.push(newUser);

  const token = generateToken(newUser);

  // Save the token in the session
  req.session.token = token;

  // You can customize the success message here
  res.status(201).json({ message: 'User registered successfully', token });
});

// Login route and generate a JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = generateToken(user);
  
    // Save the token in the session
    req.session.token = token;
  
    // Redirect to the main page with the username
    res.redirect(`/index?username=${user.username}`);
  });

// Main route with JWT authentication
app.get('/index', authenticateJWT, (req, res) => {
  const { username } = req.user;
  res.sendFile(path.join(__dirname, 'public', 'index.html'), { username });
});

// Create a new post
app.post('/posts', authenticateJWT, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Please provide post content' });
  }

  const newPost = {
    id: posts.length + 1,
    userId: req.user.userId,
    text,
  };

  posts.push(newPost);

  // You can customize the success message here
  res.status(201).json({ message: 'Post created successfully' });
});

// Get paginated posts for the authenticated user (GET) with JWT authentication
app.get('/posts', authenticateJWT, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const userPosts = posts.filter((post) => post.userId === req.user.userId).slice(startIndex, endIndex);

  res.json({
    totalPosts: userPosts.length,
    currentPage: page,
    posts: userPosts,
  });
});

// Update a post with JWT authentication
app.put('/posts/:postId', authenticateJWT, (req, res) => {
  const postId = parseInt(req.params.postId);
  const { text } = req.body;

  const postIndex = posts.findIndex((post) => post.id === postId && post.userId === req.user.userId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts[postIndex].text = text;

  // You can customize the success message here
  res.json({ message: 'Post updated successfully', updatedPost: posts[postIndex] });
});

// Delete a post with JWT authentication
app.delete('/posts/:postId', authenticateJWT, (req, res) => {
  const postId = parseInt(req.params.postId);

  const postIndex = posts.findIndex((post) => post.id === postId && post.userId === req.user.userId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  // You can customize the success message here
  res.json({ message: 'Post deleted successfully', deletedPost });
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the session and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
