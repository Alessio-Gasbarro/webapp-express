const { json } = require('express');
const connection = require('../data/db');

//INDEX
const index = (req, res) => {
    connection.query("SELECT * FROM movies", (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database query failed: " + err });

        const movies = moviesResult.map((movie) => {
            const obj = {
                ...movie,
                image: req.imagePath + movie.image
            }
            return obj
        })
        res.json(moviesResult);
    })
}

//SHOW
const show = (req, res) => {
    const { id } = req.params

    const movieSql = "SELECT * FROM movies WHERE id = ?";

    connection.query(movieSql, [id], (err, moviesResult) => {
        if (err) return res.status(500).json({ error: "Database query Failed: " + err });

        if (moviesResult.length === 0 || moviesResult[0].id === null) {
            return res.status(404).json({ error: "Not Found" });
        }

        const movie = moviesResult[0];
    })
}

module.exports = {
    index,
    show
}