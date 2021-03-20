import React from 'react';
import * as styles from './AsideAds.module.scss';
import PropTypes from 'prop-types';

const AsideAds = ({ data }) => {
    return (
        data.map(ad => (
            <div className={styles.asideAds} key={ad.name}>
                <a target="_blank"
                   rel="noopener noreferrer"
                   href={ad.url}
                   data-gtm-track="promoted-aside-cta-click">
                    <img
                        src={ad.image}
                        alt={ad.name}
                    />
                    <p className={styles.adsText}>{ad.text}</p>
                </a>
            </div>
        ))
    );
};

AsideAds.propTypes = {
    data: PropTypes.array.isRequired
};

export default AsideAds;
