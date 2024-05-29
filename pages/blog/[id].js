import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CustomHead from '../../components/head';
import Nav from '../../components/Sidebar';
import Footer from '../../components/footer';
import styles from '../../styles/BlogDetails.module.css';

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/blogs/${id}`)
        .then(response => response.json())
        .then(data => setBlog(data))
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleDelete = () => {
    fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.redirect) {
          router.push(data.redirect);
        }
      })
      .catch(err => console.log(err));
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <CustomHead title={blog.title} />
      <Nav />
      <div className={`${styles.details} ${styles.content}`}>
        <h2>{blog.title}</h2>
        <div className={styles.content}>
          <p>{blog.body}</p>
        </div>
        <a className={styles.delete} onClick={handleDelete}>
          <img src="/Supp.jpg" width="40px" alt="delete" />
        </a>
        <a href={`/blogs/edit/${blog._id}`} className={styles.update} style={{ marginLeft: '10px' }}>
          <img src="/edit-icon.png" width="40px" alt="edit" />
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
