const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data (you might use a database in a real application)
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
];

let posts = [
  { userId: 1, text: 'Post 1 by User 1' },
  { userId: 2, text: 'Post 1 by User 2' },
];

// Routes

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get posts by a specific user
app.get('/posts/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userPosts = posts.filter((post) => post.userId === userId);
  if (userPosts.length === 0) {
    return res.status(404).json({ message: 'Posts not found for this user' });
  }
  res.json(userPosts);
});

// Create a new post
app.post('/posts', (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    return res.status(400).json({ message: 'Please provide userId and text for the post' });
  }
  posts.push({ userId, text });
  res.status(201).json({ message: 'Post created successfully' });
});

// Default route
// Default route
// Default route
app.get('/', (req, res) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Social Media Dashboard App</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #add8e6;
              text-align: center;
              margin-top: 50px;
            }
            h1 {
              color: #333;
              font-size: 3em;
              margin-bottom: 20px;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            p {
              color: #666;
              font-size: 1.2em;
            }
            .app-names {
              display: flex;
              justify-content: center;
              margin-top: 30px;
            }
            .app-names div {
              padding: 10px 20px;
              margin: 0 10px;
              background-color: #0077cc;
              color: #fff;
              border-radius: 5px;
              font-weight: bold;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to the Social Media Dashboard App!</h1>
          <p>Explore and manage your social media accounts in one place.</p>
          <div class="app-names">
            <div>FaceSnap</div>
            <div>InstaBook</div>
            <div>TweetChat</div>
            <!-- Add more social media app names here -->
          </div>
        </body>
      </html>
    `;
    
    res.send(htmlContent);
  });
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
