const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const {sequelize} = require('./models');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", postRoutes);
app.get('/', (req, res) => {
    res.send('API is working 🚀');
});

sequelize.sync({alter: true})
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error))

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})


