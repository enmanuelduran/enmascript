import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import Container from 'components/Container/Container';
import { graphql, Link } from 'gatsby';
import shortid from 'shortid';
import './series.scss';

const Series = ({ data }) => (
    <Layout section="series">
        <Helmet title="Series" />
        <Container classes="series">
            {data.site.siteMetadata.series_list.map(element => {
                const image = require(`../../content/images/${
                    element.featuredImage
                }`);

                return (
                    <Link
                        key={shortid.generate()}
                        style={{ backgroundImage: `url(${image})` }}
                        className="series__card"
                        to={element.slug}
                    />
                );
            })}
        </Container>
    </Layout>
);

export const SeriesQuery = graphql`
    query SeriesQuery {
        site {
            siteMetadata {
                series_list {
                    name
                    slug
                    featuredImage
                }
            }
        }
    }
`;

export default Series;
