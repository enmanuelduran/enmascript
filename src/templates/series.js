import React from 'react';
import Container from 'components/Container/Container';
import Layout from 'components/layout';
import { graphql } from 'gatsby';
import ArticleCard from 'components/ArticleCard/ArticleCard';
import './articles.scss';

const SeriesArticlesTemplate = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <Layout section="series">
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

export const seriesQuery = graphql`
    query ArticlesBySeries($name: String!) {
        allMarkdownRemark(filter: { frontmatter: { series: { eq: $name } } }) {
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

export default SeriesArticlesTemplate;
