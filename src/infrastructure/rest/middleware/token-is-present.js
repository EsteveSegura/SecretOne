const isTokenPresent = async (req, res, next) => {
    const { headers } = req;

    if (!headers.authorization) {
        return res.status(400).json({ message: 'authorization not present' });
    }

    const [bearer, token] = headers.authorization.split(' ');

    if(bearer != 'Bearer'){
        return res.status(400).json({ message: 'not bearer token' })
    }

    req.token = token
    next();
}

module.exports = isTokenPresent