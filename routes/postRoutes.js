const express = require('express');
const {createPost, getPosts, getPostById, getPostByTagName, getTags, searchPosts} = require('../controllers/postControllers');
const {authAdmin} = require("../middleware/authMeddleware");
const {adminLogin} = require("../controllers/authController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads')
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + '-' + file.originalname );
    }
})

const upload = multer({storage})

const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/postCreate', upload.fields([{name:'image', maxCount: 1},{name:'cardImage', maxCount: 20}]), authAdmin,  createPost);
router.get('/posts', getPosts);
router.get('/search', searchPosts);
router.get('/post/:id', getPostById);
router.get('/post/tag/:tagName', getPostByTagName);
router.get('/tags', getTags);



module.exports = router;
