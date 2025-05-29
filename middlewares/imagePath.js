const setimagePath = (req, res, next) => {
    console.log(req.protocol, req.get('host'), req.imagePath);
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies`
    next()
};

module.exports = setimagePath