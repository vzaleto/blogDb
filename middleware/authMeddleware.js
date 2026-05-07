const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.authAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({message:  ' authAdmin Unauthorized'})
    }
    const token = authHeader.split(' ')[1]


    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     console.log("TOKEN:", token);
    //     console.log("SECRET:", process.env.JWT_SECRET);
    //     console.log("ERROR:", err);
    //     console.log("DECODED:", decoded);
    //
    //     if (err) {
    //         return res.status(403).json({ error: 'Error verifying token' });
    //     }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("TOKEN:", token);
             console.log("SECRET:", process.env.JWT_SECRET);
             console.log("ERROR:", err);
             console.log("DECODED:", decoded);
        if(err) {
            return res.status(403).json({error: 'Error verifying token'})
        }

        if(decoded.role !== 'admin') {
            return res.status(403).json({error: 'Unauthorized'})
        }
        req.user = decoded;
        next();
    })

}