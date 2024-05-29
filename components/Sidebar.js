// components/Sidebar.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ user }) => {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebarLinks}>
                {user ? (
                    <>
                        <li>
                            <Link href="/blogs">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs/create">
                                New Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/users/logout">
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                Signup
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Sidebar;
