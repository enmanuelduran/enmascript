import React from 'react';
import Layout from 'components/layout';
import Helmet from 'react-helmet';
import Container from 'components/Container';
import { graphql } from 'gatsby';
import SeriesCard from 'components/SeriesCard';
import containerStyles from 'components/Container/Container.module.scss';
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
        <Container classes={containerStyles.containerPage}>
            {data.site.siteMetadata.series_list.map(element => (
                <SeriesCard
                   key={shortid.generate()}
                   image={element.featuredImage}
                   name={element.name}
                   slug={element.slug}
                />
            ))}
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
                url
            }
        }
    }
`;

export default Series;
