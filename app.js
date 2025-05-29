const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})