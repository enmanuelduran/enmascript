import React from 'react';
import Container from 'components/Container';
import Helmet from 'react-helmet';
import Layout from 'components/layout';
import { graphql } from 'gatsby';
import ArticleCard from 'components/ArticleCard';

const SeriesArticlesTemplate = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <Layout section="series">
            <Helmet title="Series" />
            <Container classes="articles">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => (
                        <ArticleCard
                            title={post.frontmatter.title}
                            image={post.frontmatter.featuredImage}
                            slug={post.fields.slug}
                            key={post.id}
                            date={post.frontmatter.date}
                            readingTime={post.fields.readingTime.text}
                        />
                    ))}
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
                        date(formatString: "MMMM DD, YYYY")
                    }
                    fields {
                        slug
                        readingTime {
                            text
                        }
                    }
                }
            }
        }
    }
`;

export default SeriesArticlesTemplate;
