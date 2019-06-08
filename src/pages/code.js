import React from 'react';
import Layout from 'components/layout';
import Helmet from 'react-helmet';
import Container from 'components/Container';
import { graphql, Link } from 'gatsby';
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
        <Container classes="code">
            {data.site.siteMetadata.code_list.map(element => {
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
            }
        }
    }
`;

export default Code;
