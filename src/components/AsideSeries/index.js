import React from 'react';
import shortid from 'shortid';
import { Link } from 'gatsby';
import styles from './AsideSeries.module.scss';
import seriesCardStyles from 'components/SeriesCard/SeriesCard.module.scss';

const AsideSeries = ({seriesList}) => {
    return (
        <div>
            <p className={styles.asideTitle}>Popular Series</p>
            <div className={styles.asideSeries}>
                {seriesList.map(element => {
                    const image = require(`content/images/${
                        element.featuredImage
                    }`);

                    return (
                        <Link
                            key={shortid.generate()}
                            style={{ backgroundImage: `url(${image})` }}
                            className={`${seriesCardStyles.seriesCard} ${styles.asideSeriesCard}`}
                            data-name={element.name}
                            to={element.slug}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AsideSeries;
