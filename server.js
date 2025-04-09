const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// TMDB API configuration
const TMDB_API_KEY = 'your_tmdb_api_key'; // Replace with your actual API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Serve frontend statically
app.use(express.static('frontend'));

// API endpoint to fetch popular movies from TMDB
app.get('/movies', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                page: 1
            }
        });
        const movies = response.data.results.map(movie => ({
            title: movie.title,
            thumbnail: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        }));
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies from TMDB:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});