const express = require('express'); // this imports express, so we can use it via `app`
const path = require('path'); // this imports path, so we can use it via `path.join()` to make URLs and file paths
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html'); // this makes a path to the index.html via: ./public/index.html
  res.sendFile(filePath); // this line sends the file to the requesting client
});

// new route for about.html
app.get('/about', (req, res) => {
  console.log('my silly message this is sent from inside the /about route handler')
  res.sendFile(path.join(__dirname, 'public', 'about.html')); // send about.html when the user visits /about
});

// ... previous code ...

// In-memory data store
const USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

// API routes
app.get('/api/users', (req, res) => {
  res.json(USERS);
});

app.get('/api/users/:id', (req, res) => {
  const user = USERS.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

app.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.email) return res.status(400).send('Missing required fields');
  const user = {
    id: USERS.length + 1,
    name: req.body.name,
    email: req.body.email
  }
  USERS.push(user);
  res.json(user);
});

// ... rest of the code ...



// THIS GOES AT THE END BECAUSE IT'S THE PART WHERE WE START THE SERVER
const PORT = process.env.PORT || 3000; // use port from environment or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // log a message when the server starts
});
