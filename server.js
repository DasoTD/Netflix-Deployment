const express = require('express');
const app = express();
const port = 3000;

// Serve frontend statically
app.use(express.static('frontend'));

// Backend API
const movies = [
    { title: 'Sample Movie 1', thumbnail: 'https://via.placeholder.com/200' },
    { title: 'Sample Movie 2', thumbnail: 'https://via.placeholder.com/200' }
];
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});