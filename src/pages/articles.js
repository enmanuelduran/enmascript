import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from 'components/layout';
import Container from 'components/Container';
import ArticleCard from 'components/ArticleCard';

const Articles = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <Layout section="articles">
            <Helmet title="Articles" />
            <Container classes="articles">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        const image = require(`../../content/images/${
                            post.frontmatter.featuredImage
                        }`);

                        return (
                            <ArticleCard
                                title={post.frontmatter.title}
                                image={image}
                                slug={post.fields.slug}
                                key={post.id}
                            />
                        );
                    })}
            </Container>
        </Layout>
    );
};

export const pageQuery = graphql`
    query ArticlesQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
    }
`;

export default Articles;
