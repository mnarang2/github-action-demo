const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 8000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Website name and logo path
const websiteName = 'AI Image Analyzer';
const logoPath = '/images/logo.png'; // Assuming you have a logo image in the public/images folder

// Routes
app.get('/', (req, res) => {
  res.render('login', { websiteName, logoPath });
});

app.post('/login', (req, res) => {
  // Simple login logic with demo credentials
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.loggedIn = true;
    req.session.username = req.body.username; // Store username in session
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard', { websiteName, logoPath, username: req.session.username });
  } else {
    res.redirect('/');
  }
});

app.get('/about', (req, res) => {
  res.render('about', { websiteName, logoPath });
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    // Here you would typically call an AI service to analyze the image
    // For now, we'll just send a placeholder response
    res.json({ message: 'Image uploaded and analyzed successfully!' });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
