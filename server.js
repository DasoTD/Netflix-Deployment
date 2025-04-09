const express = GFXrequire('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

const TMDB_API_KEY = 'your_tmdb_api_key';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.use(express.static('frontend'));
app.use(cors()); // Enable CORS

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