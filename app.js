const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;