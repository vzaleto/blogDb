const express = require('express');
const path = require('path');
const router = express.Router();
const {createPost, getPosts, getPostById, getPostByTagName, getTags, searchPosts,deletePost, updatePost,
    getPostByCategory
} = require('../controllers/postControllers');
const {authAdmin} = require("../middleware/authMeddleware");
const {adminLogin} = require("../controllers/authController");
const multer = require("multer");
const {createCategory, getCategories} = require("../controllers/categoryControllers");
const fs = require('fs');
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, uploadDir)
    },
    filename: (req, file, cd) => {
        const ext = path.extname(file.originalname);
        const fileName =
            Date.now() +
            '-' +
            Math.random().toString(36).slice(2, 8) +
            ext;

        cd(null, fileName);
    }
})

const upload = multer({storage})


router.post('/admin/login', adminLogin);
router.post('/postCreate', upload.fields([{name:'image', maxCount: 1},{name:'cardImage', maxCount: 20}]), authAdmin,  createPost);
router.get('/posts', getPosts);
router.get('/search', searchPosts);
router.get('/post/:id', getPostById);
router.get('/post/tag/:tagName', getPostByTagName);
router.get('/tags', getTags);
router.delete('/post/:id', deletePost);
router.post('/category', authAdmin, createCategory);
router.get('/category', getCategories);
router.patch('/postEdit/:id', upload.fields([{name:'image', maxCount: 1},{name:'cardImage', maxCount: 20}]), authAdmin, updatePost);
router.get('/post/category/:slug', getPostByCategory); //
module.exports = router;
