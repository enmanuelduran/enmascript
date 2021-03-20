import React from 'react';
import * as styles from './Footer.module.scss';

const Footer = () => (
    <footer className={styles.footer}>
        <p>
            © Copyright EnmaScript 2017-2018. All code based on the
            <a href="http://opensource.org/licenses/MIT"> MIT license</a>.
        </p>
    </footer>
);

export default Footer;
