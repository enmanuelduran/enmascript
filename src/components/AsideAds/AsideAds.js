import React from 'react';
import Adsense from 'react-adsense';
import styles from './AsideAds.module.scss';
import PropTypes from 'prop-types';

const AsideAds = ({ data }) => {
    return (
        <div className={styles.asideAds}>
            <Adsense.Google
                client="ca-pub-4858256894602983"
                slot="1026138458"
                format="auto"
                style={{ display: 'block' }}
                responsive="true"
            />
        </div>
    );
};

AsideAds.propTypes = {
    data: PropTypes.array.isRequired
};

export default AsideAds;
