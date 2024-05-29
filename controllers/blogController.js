const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .populate('author', 'name')  // Assuming 'author' is a referenced document
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error fetching blogs' });
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching blog details' });
        });
};

const blog_create_get = (req, res) => {
    // Typically, you don't need a server route to handle form display in a SPA
    res.json({ message: 'Client handles creation form display' });
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: 'Error creating new blog' });
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'No blog to delete' });
            }
            res.json({ message: 'Blog deleted successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error deleting blog' });
        });
};

const getEditBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'No blog found to update' });
        }
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    getEditBlog,
    updateBlog,
};
