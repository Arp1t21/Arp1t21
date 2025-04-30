// Save this as test-api.js in your project root
// Test this by running "node test-api.js" in your terminal

const fetch = require('node-fetch'); // You might need to install this: npm install node-fetch

async function testApi() {
  console.log('Testing API endpoints...');
  
  try {
    // Test the basic test endpoint
    console.log('\nTesting /api/test');
    const testResponse = await fetch('http://localhost:3001/api/test');
    
    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log('SUCCESS: /api/test response:', testData);
    } else {
      console.error('ERROR: /api/test returned status', testResponse.status);
    }
    
    // Test getting comments
    console.log('\nTesting /api/comments');
    const commentsResponse = await fetch('http://localhost:3001/api/comments');
    
    if (commentsResponse.ok) {
      const commentsData = await commentsResponse.json();
      console.log('SUCCESS: /api/comments response:', commentsData);
    } else {
      console.error('ERROR: /api/comments returned status', commentsResponse.status);
    }
    
    // Test adding a comment
    console.log('\nTesting /api/add-comment');
    const addCommentResponse = await fetch('http://localhost:3001/api/add-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 1,
        content: 'Test comment from API test script'
      })
    });
    
    if (addCommentResponse.ok) {
      const addCommentData = await addCommentResponse.json();
      console.log('SUCCESS: /api/add-comment response:', addCommentData);
    } else {
      console.error('ERROR: /api/add-comment returned status', addCommentResponse.status);
    }
    
  } catch (error) {
    console.error('Connection error:', error.message);
  }
}

testApi();