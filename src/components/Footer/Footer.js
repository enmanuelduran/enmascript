import React from 'react';
import * as styles from './Footer.module.scss';

const currentYear = new Date().getFullYear();

const Footer = () => (
    <footer className={styles.footer}>
        <p>
            © Copyright EnmaScript {currentYear-1}-{currentYear}. All code based on the
            <a href="http://opensource.org/licenses/MIT"> MIT license</a>.
        </p>
    </footer>
);

export default Footer;
