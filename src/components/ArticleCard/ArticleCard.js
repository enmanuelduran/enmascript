import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Reddit } from '../Icons/SocialIcons';
import styles from './ArticleCard.module.scss';

const ArticleCard = ({
    image,
    title,
    summary,
    slug,
    date,
    readingTime,
    reddit,
    series,
    classes,
    titleClass,
    imageClass
}) => (
    <div className={`${styles.articleCard} ${classes}`}>
        <article className={styles.cardContent}>
            <Link
                to={slug}
                className={`${styles.cardImage} ${imageClass}`}
                style={{ backgroundImage: `url(/images/${image})` }}>
                <div className={styles.cardInfo}>
                    <span>{date}</span>
                    <span>{readingTime}</span>
                </div>
            </Link>
            <div className={styles.cardTextWrapper}>
                <Link to={slug} className={`${styles.cardTitle} ${titleClass}`}>
                    <h2>{title}</h2>
                </Link>
                <p>
                    {summary}
                    <Link to={slug} className={styles.cardReadMore}>
                        Read more
                    </Link>
                </p>
                <div className={styles.cardButtons}>
                    {reddit && (
                        <a
                            href={reddit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.cardReddit}>
                            <Reddit />
                            <span>Let's talk</span>
                        </a>
                    )}

                    <div className={styles.cardSeries}>
                        {series.length > 0
                            && series.map(serie =>  (
                            <Link
                                key={serie.slug}
                                to={serie.slug}
                                className={styles.cardSerie}>
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
    classes: '',
    titleClass: '',
    imageClass: ''
};

ArticleCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    reddit: PropTypes.string,
    series: PropTypes.array,
    classes: PropTypes.string,
    titleClass: PropTypes.string,
    imageClass: PropTypes.string
};

export default ArticleCard;
