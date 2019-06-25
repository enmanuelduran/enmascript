import React from 'react';

const AsideAds = ({data}) => {
    return (
        data.map(ad => (
            <div className="aside__ads" key={ad.name}>
                <a target="_blank"
                   rel="noopener noreferrer"
                   className="aside__ad"
                   href={ad.url}>
                    <img
                        src={ad.image}
                        alt={ad.name}
                    />
                    <p className="sponsoredText">{ad.text}</p>
                </a>
            </div>
        ))
    );
};

export default AsideAds;
