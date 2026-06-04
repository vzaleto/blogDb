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

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName =
            Date.now() +
            '-' +
            Math.random().toString(36).slice(2, 8) +
            ext;

        cb(null, fileName);
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
