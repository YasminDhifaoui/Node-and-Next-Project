import React from 'react';

const BlogsList = ({ blogs }) => (
  <div className="blogs content">
    <h2>All Blogs</h2>

    {blogs.length > 0 ? (
      blogs.map(blog => (
        <a key={blog._id} className="single" href={`/blogs/${blog._id}`}>
          <h3 className="title">{blog.title}</h3>
          <p className="snippet">Snippet: {blog.snippet}</p>
          <p className="body">{blog.body}</p>
          {blog.author ? (
            <p className="author">Written by: {blog.author.username} in {blog.createdAt}</p>
          ) : (
            <p className="author">Author unknown in {blog.createdAt}</p>
          )}
        </a>
      ))
    ) : (
      <p>No blogs...</p>
    )}
  </div>
);

export default BlogsList;
