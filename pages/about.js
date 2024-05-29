import Head from 'next/head';
import Nav from '../components/Sidebar';
import Footer from '../components/footer';

const AboutUs = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
        {/* Include any other head elements here */}
      </Head>
      
      <Nav />

      <div className="blogs content">
        <h2>About Us</h2>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
