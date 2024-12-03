const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

exports.adminLogin = (req, res) => {
    const {username, password} = req.body
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({role: 'admin'}, process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.status(200).json({token})
    }

    return res.status(401).json({message: 'Unauthorized'})
}