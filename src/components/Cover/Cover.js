import React from 'react';
import PropTypes from 'prop-types';

import './Cover.scss';

const Cover = ({ children, image, classes }) => (
    <div
        className={`cover ${classes}`}
        style={{ backgroundImage: `url(${image})` }}>
        {children}
    </div>
);

Cover.propTypes = {
    image: PropTypes.string.isRequired,
    classes: PropTypes.string
};

Cover.defaultProps = {
    classes: ''
};

export default Cover;
