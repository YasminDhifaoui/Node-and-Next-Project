const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

// Route for fetching the list of blogs
router.get('/', blogController.blog_index);

// Route for rendering the page that displays the list of blogs
router.get('/list', (req, res) => {
  // You can render your HTML template or component here
  res.render('blogsList'); // Assuming you're using server-side rendering (e.g., with a templating engine like EJS)
});

// API to create a new blog post
router.post('/', blogController.blog_create_post);

// API to get details for creating a blog (if necessary, often handled client-side)
router.get('/create', blogController.blog_create_get);

// API to get detailed view of a single blog post
router.get('/:id', blogController.blog_details);

// API to delete a blog post
router.delete('/:id', blogController.blog_delete);

// Route for getting the data needed to populate the blog edit form
router.get('/edit/:id', blogController.getEditBlog);

// Route for posting updates to a blog
router.post('/update/:id', blogController.updateBlog);

module.exports = router;
