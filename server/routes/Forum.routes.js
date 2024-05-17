const express = require('express');
const router = express.Router();
const forumController = require("../controllers/Forum.controller");

router.post("/forum/new", forumController.saveForum);
router.get("/forum", forumController.getPageForum);
router.get("/forum/:id", forumController.getForumById);
router.post('/forum/comment', forumController.saveComments);
router.get('/forum/:id', forumController.getCommentsByForumId);
//router.get('/forum/:id', forumController.getForum);
module.exports = router;