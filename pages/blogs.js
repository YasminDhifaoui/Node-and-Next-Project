import { useState, useEffect } from 'react';
import CustomHead from '../components/head';
import Nav from '../components/Sidebar';
import Footer from '../components/footer';
import BlogsList from '../components/BlogsList';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs data from your API or wherever you get it from
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <CustomHead title="All Blogs" />
      <Nav />
      <BlogsList blogs={blogs} />
      <Footer />
    </div>
  );
};

export default BlogsPage;
