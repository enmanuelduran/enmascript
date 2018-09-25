import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from 'components/layout';
import Container from 'components/Container';
import ArticleCard from 'components/ArticleCard';

const Articles = ({ data }) => {
    const { edges: posts } = data.articles;

    return (
        <Layout section="articles">
            <Helmet title="Articles">
                <link
                    rel="canonical"
                    href={`${data.metadata.siteMetadata.url}/articles`}
                />
            </Helmet>
            <Container classes="articles">
                {posts.map(({ node: post }) => (
                    <ArticleCard
                        title={post.frontmatter.title}
                        image={post.frontmatter.featuredImage}
                        slug={post.fields.slug}
                        key={post.id}
                    />
                ))}
            </Container>
        </Layout>
    );
};

export const pageQuery = graphql`
    query ArticlesQuery {
        articles: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        featuredImage
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        metadata: site {
            siteMetadata {
                url
            }
        }
    }
`;

export default Articles;
