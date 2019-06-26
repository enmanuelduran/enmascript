import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.scss';

const Container = ({ type, children, classes }) => (
    <div className={`${styles.container} container--${type} ${classes}`}>{children}</div>
);

Container.propTypes = {
    type: PropTypes.string,
    classes: PropTypes.string,
    children: PropTypes.node.isRequired
};

Container.defaultProps = {
    type: 'page',
    classes: ''
};

export default Container;
