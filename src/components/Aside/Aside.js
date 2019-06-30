import React from 'react';
import PropTypes from 'prop-types';
import styles from './Aside.module.scss';

const Aside = ({children}) => (
    <section className={styles.aside}>
        {children}
    </section>
);

Aside.propTypes = {
    children: PropTypes.node.isRequired
};

export default Aside;
