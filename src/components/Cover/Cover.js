import React from 'react';
import PropTypes from 'prop-types';

const Cover = ({ children, image, classes }) => (
    <div
        className={`cover ${classes}`}
        style={{
            backgroundImage: `url(${image}), linear-gradient(#074cb3, #000036)`
        }}>
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
