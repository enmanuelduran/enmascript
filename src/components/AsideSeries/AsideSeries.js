import React from 'react';
import styles from './AsideSeries.module.scss';
import SeriesCard from '../SeriesCard';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const AsideSeries = ({seriesList}) => {
    return (
        <div>
            <p className={styles.asideSeriesTitle}>Popular Series</p>
            <div className={styles.asideSeries}>
                {seriesList.map(element => (
                    <SeriesCard
                        key={shortid.generate()}
                        image={element.featuredImage}
                        name={element.name}
                        slug={element.slug}
                        classes={styles.asideSeriesCard}
                    />
                ))}
            </div>
        </div>
    );
};

AsideSeries.propTypes = {
    seriesList: PropTypes.array.isRequired
};

export default AsideSeries;

