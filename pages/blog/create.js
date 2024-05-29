import { useState } from 'react';
import CustomHead from '../../components/Head';
import Nav from '../../components/Sidebar';
import Footer from '../../components/Footer';
import styles from '../../styles/CreateBlog.module.css';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    snippet: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful form submission (e.g., redirect or display success message)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <CustomHead title="Create Blog" />
      <Nav />
      <div className={`${styles.createBlog} ${styles.content}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title" className={styles.label}>Blog title :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
          />
          
          <label htmlFor="snippet" className={styles.label}>Blog snippet :</label>
          <input
            type="text"
            id="snippet"
            name="snippet"
            value={formData.snippet}
            onChange={handleChange}
            required
            className={styles.input}
          />
          
          <label htmlFor="body" className={styles.label}>Blog body :</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlog;
