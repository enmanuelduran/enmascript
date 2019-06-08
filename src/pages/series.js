import React from 'react';
import Layout from 'components/layout';
import Helmet from 'react-helmet';
import Container from 'components/Container';
import { graphql, Link } from 'gatsby';
import shortid from 'shortid';

const Series = ({ data }) => (
    <Layout section="series">
        <Helmet
            title="Series"
            meta={[
                {
                    name: 'description',
                    content: data.site.siteMetadata.descriptions.series
                },
                {
                    name: 'og:description',
                    content: data.site.siteMetadata.descriptions.series
                },
                {
                    name: 'twitter:description',
                    content: data.site.siteMetadata.descriptions.series
                }
            ]}>
            <link
                rel="canonical"
                href={`${data.site.siteMetadata.url}/series`}
            />
        </Helmet>
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
                descriptions {
                    series
                }
            }
        }
    }
`;

export default Series;
