const { json } = require('express');
const connection = require('../data/db');

//INDEX
const index = (req, res) => {
    console.log('Elenco Film')
}

//SHOW
const show = (req, res) => {
    console.log('ID dei film' + req.params.id)
}

module.exports = {
    index,
    show
}