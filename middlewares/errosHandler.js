const errorHandler = (err, req, res, next) => {
    res.status(500).send({
        error: 'Internal server error',
        message: err.message
    })
}

module.exports = errorHandler;