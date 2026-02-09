const express = require("express");
const router = express.Router();

const { createPost, getAllPosts, updatePost, deletePost } = require("../controller/postcontroller");

router.post("/", createPost); 
router.get("/", getAllPosts); 
router.put("/", updatePost);  
router.delete("/", deletePost); 

module.exports = router;
