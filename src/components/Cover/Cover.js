import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Cover.module.scss';

const Cover = ({ children, classes }) => (
    <div
        className={`${styles.cover} ${classes}`}>
        {children}
    </div>
);

Cover.propTypes = {
    classes: PropTypes.string,
    children: PropTypes.node.isRequired
};

Cover.defaultProps = {
    classes: ''
};

export default Cover;
