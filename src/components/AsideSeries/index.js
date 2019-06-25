import React from 'react';
import shortid from 'shortid';
import { Link } from 'gatsby';

const AsideSeries = ({seriesList}) => {
    return (
        <div className="aside__series">
            <p className="aside__title">Popular Series</p>
            <div className="aside__series">
                {seriesList.map(element => {
                    const image = require(`content/images/${
                        element.featuredImage
                    }`);

                    return (
                        <Link
                            key={shortid.generate()}
                            style={{ backgroundImage: `url(${image})` }}
                            className="series__card series__card--aside"
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
