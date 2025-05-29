const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;

const moviesRouter = require('./routers/moviesRouter');

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
    res.send('Movies API Server')
});

app.use('/api/movies', moviesRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})