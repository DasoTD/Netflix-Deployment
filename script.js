// script.js
fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(data => {
        const movieList = document.getElementById('movieList');
        data.forEach(movie => {
            const div = document.createElement('div');
            div.className = 'movie';
            div.innerHTML = `<img src="${movie.thumbnail}" width="200"><p>${movie.title}</p>`;
            movieList.appendChild(div);
        });
    });
    


    docker build -t netflix-clone .
docker run -p 3000:3000 netflix-clone