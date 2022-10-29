const logger = (req, res, next) => {

    console.log(req);
    next();

}

module.exports = {

    logger

}
