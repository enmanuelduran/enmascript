import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Reddit } from 'components/Icons/SocialIcons';

const ArticleCard = ({
    image,
    title,
    summary,
    slug,
    date,
    readingTime,
    reddit,
    series
}) => (
    <div className="article-card">
        <article className="article-card__content">
            <Link
                to={slug}
                className="article-card__image"
                style={{ backgroundImage: `url(/images/${image})` }}>
                <div className="article-card__info">
                    <span>{date}</span>
                    <span>{readingTime}</span>
                </div>
            </Link>
            <div className="article-card__text-wrapper">
                <Link to={slug} className="article-card__title">
                    <h2>{title}</h2>
                </Link>
                <p>
                    {summary}
                    <Link to={slug} className="article-card__readmore">
                        Read more
                    </Link>
                </p>
                <div className="article-card__buttons">
                    {reddit && (
                        <a
                            href={reddit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-card__reddit">
                            <Reddit />
                            <span>Let's talk</span>
                        </a>
                    )}

                    <div className="article-card__series">
                        {series.length > 0
                            && series.map(serie =>  (
                            <Link
                                key={serie.slug}
                                to={serie.slug}
                                className="article-card__serie">
                                #{serie.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    </div>
);

ArticleCard.defaultProps = {
    reddit: '',
    series: [],
};

ArticleCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    reddit: PropTypes.string,
    series: PropTypes.array
};

export default ArticleCard;
