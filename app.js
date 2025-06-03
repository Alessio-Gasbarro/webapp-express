const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

//Dopo l'installazione, importo cors
const cors = require('cors');

const port = process.env.SERVER_PORT || 3000;

const moviesRouter = require('./routers/moviesRouter');

const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errosHandler');
const imagePathMiddelware = require('./middlewares/imagePath');

//Middelware CORS
app.use(cors({ origin: process.env.FE_APP }));

app.use(express.static('public'));
app.use(express.json());

app.use(imagePathMiddelware);

app.get("/", (req, res) => {
    res.send('Movies API Server')
});

app.use('/api/movies', moviesRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})