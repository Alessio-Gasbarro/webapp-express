const { json } = require('express');
const connection = require('../data/db');

// INDEX
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database query failed: " + err });

        const movies = moviesResult.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            };
        });

        res.json(movies);
    });
};

// SHOW
const show = (req, res) => {
    const { id } = req.params;

    const movieSql = "SELECT * FROM movies WHERE id = ?";
    const reviewsSQL = "SELECT * FROM reviews WHERE movie_id = ?";
    const averageSQL = "SELECT M.*, ROUND(AVG(R.vote)) AS averageRating FROM reviews JOIN reviews R ON R.movie_id =  WHERE movie_id = ?";

    connection.query(movieSql, [id], (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database query Failed: " + err });

        if (moviesResult.length === 0 || moviesResult[0].id === null) {
            return res.status(404).json({ error: "Not Found" });
        }

        const movie = moviesResult[0];

        connection.query(reviewsSQL, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: "Database query Failed: " + err });

            connection.query(averageSQL, [id], (err, avgResult) => {
                if (err) return res.status(500).json({ error: "Database query Failed: " + err });

                const averageRating = avgResult[0].averageRating;

                movie.reviews = reviewResult;
                movie.averageRating = averageRating;

                res.json({ ...movie, image: req.imagePath + movie.image });
            });
        });
    });
};

module.exports = {
    index,
    show
};