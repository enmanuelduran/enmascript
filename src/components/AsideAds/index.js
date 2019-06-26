import React from 'react';
import styles from './AsideAds.module.scss';

const AsideAds = ({data}) => {
    return (
        data.map(ad => (
            <div className={styles.asideAds} key={ad.name}>
                <a target="_blank"
                   rel="noopener noreferrer"
                   href={ad.url}>
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

export default AsideAds;
