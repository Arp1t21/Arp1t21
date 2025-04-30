// Save this as test-server.js in your project root
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins for testing
  credentials: true
}));
app.use(express.json());

// Simple in-memory comments array for testing
let comments = [
  { id: 1, user_id: 1, username: 'Test User', content: 'Test comment', created_at: new Date().toISOString(), avatar: null }
];

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Comments routes
app.get('/api/comments', (req, res) => {
  console.log('GET /api/comments called');
  res.json(comments);
});

app.post('/api/add-comment', (req, res) => {
  console.log('POST /api/add-comment called with body:', req.body);
  const { userId, content } = req.body;
  
  if (!userId || !content) {
    return res.status(400).json({ error: 'User ID and content are required' });
  }
  
  const newComment = {
    id: comments.length + 1,
    user_id: userId,
    username: 'User ' + userId,
    content: content,
    created_at: new Date().toISOString(),
    avatar: null
  };
  
  comments.push(newComment);
  res.json({ id: newComment.id });
});

// Start server
app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- GET /api/test');
  console.log('- GET /api/comments');
  console.log('- POST /api/add-comment');
});