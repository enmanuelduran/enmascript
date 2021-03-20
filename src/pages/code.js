import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import Container from '../components/Container';
import { graphql } from 'gatsby';
import SeriesCard from '../components/SeriesCard';
import * as containerStyles from '../components/Container/Container.module.scss';
import shortid from 'shortid';

const Code = ({ data }) => (
    <Layout section="code">
        <Helmet
            title="Code"
            meta={[
                {
                    name: 'description',
                    content: data.site.siteMetadata.descriptions.code
                },
                {
                    name: 'og:description',
                    content: data.site.siteMetadata.descriptions.code
                },
                {
                    name: 'twitter:description',
                    content: data.site.siteMetadata.descriptions.code
                }
            ]}>
            <link rel="canonical" href={`${data.site.siteMetadata.url}/code`} />
        </Helmet>
        <Container classes={containerStyles.containerPage}>
            {data.site.siteMetadata.code_list.map(element => (
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

Code.propTypes = {
    data: PropTypes.object.isRequired
};

export const CodeQuery = graphql`
    query CodeQuery {
        site {
            siteMetadata {
                code_list {
                    name
                    slug
                    featuredImage
                }
                descriptions {
                    code
                }
                url
            }
        }
    }
`;

export default Code;
