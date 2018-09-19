import React from 'react';
import PropTypes from 'prop-types';
import './Container.scss';

const Container = ({ type, children, classes }) => (
    <div className={`container container--${type} ${classes}`}>{children}</div>
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
