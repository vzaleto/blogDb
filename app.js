const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Post = require('./models/Post');
const Tag = require('./models/Tag');
const PostTag = require('./models/PostTag');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


sequelize.sync({alter: true})
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})