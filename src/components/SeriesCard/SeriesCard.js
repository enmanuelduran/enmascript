import React from 'react';
import PropTypes from 'prop-types';
import styles from './SeriesCard.module.scss';
import { Link } from 'gatsby';

const SeriesCard = ({ name, slug, image, classes}) => {
    const getImage = require(`../../../content/images/${image}`);

    return (
        <Link
            style={{ backgroundImage: `url(${getImage})` }}
            className={`${styles.seriesCard} ${classes}`}
            data-name={name}
            to={slug}
        />
    );
};

SeriesCard.propTypes = {
    name: PropTypes.string,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    classes: PropTypes.string
};

SeriesCard.defaultProps = {
    name: '',
    classes: ''
};

export default SeriesCard;
