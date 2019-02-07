import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const ArticleCard = ({ image, title, slug, date, readingTime }) => (
    <div className="article-card">
        <Link to={slug}>
            <article className="article-card__content">
                <div
                    className="article-card__image"
                    style={{ backgroundImage: `url(/images/${image})` }}>
                    <div className="article-card__info">
                        <span>{date}</span>
                        <span>{readingTime}</span>
                    </div>
                </div>
                <div className="article-card__text-wrapper">
                    <h2>{title}</h2>
                </div>
            </article>
        </Link>
    </div>
);

ArticleCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired
};

export default ArticleCard;
