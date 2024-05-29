// pages/index.js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.css'; // Adjust path if necessary

const Home = ({ user }) => {
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Blog Site</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content Area */}
            <div className={styles.content}>
                <Image src="/background.jpg" alt="Blog Background" layout="fill" className={styles.backgroundImage} objectFit="cover" />
                <h2 className={styles.heading}>Welcome to our blogging site. Here you will find insightful and engaging content written by a diverse group of authors.</h2>
            </div>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    // Fetch user data here
    const user = null; // Replace with actual user fetching logic

    return {
        props: {
            user,
        },
    };
};

export default Home;
