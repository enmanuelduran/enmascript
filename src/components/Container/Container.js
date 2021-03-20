import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Container.module.scss';

const Container = ({ children, classes }) => (
    <div className={`${styles.container} ${classes}`}>{children}</div>
);

Container.propTypes = {
    classes: PropTypes.string,
    children: PropTypes.node.isRequired
};

Container.defaultProps = {
    classes: ''
};

export default Container;
