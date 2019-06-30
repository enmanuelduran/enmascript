import React from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import AsideAds from '../components/AsideAds';
import AsideSeries from '../components/AsideSeries';
import ArticleCard from '../components/ArticleCard';
import containerStyles from '../components/Container/Container.module.scss';
import asideStyles from '../components/Common/aside.module.scss';
import styles from '../pages/articles.module.scss';
import { getSeries } from '../helpers/articles';

const SeriesArticlesTemplate = ({ data }) => {
    const { edges: posts } = data.articles;
    const siteMetadata = data.metadata.siteMetadata;

    return (
        <Layout section="series">
            <Helmet title="Series" />
            <Container classes={`${styles.articlesContainer} ${containerStyles.containerPage}`}>
                <section>
                    {posts
                        .filter(post => post.node.frontmatter.title.length > 0)
                        .map(({ node: post }) => {
                            return <ArticleCard
                                title={post.frontmatter.title}
                                image={post.frontmatter.featuredImage}
                                slug={post.fields.slug}
                                key={post.id}
                                date={post.frontmatter.date}
                                readingTime={post.fields.readingTime.text}
                                summary={post.frontmatter.summary}
                                series={getSeries(post, siteMetadata)}
                                reddit={post.frontmatter.reddit}
                            />
                        })}
                </section>
                <section className={asideStyles.aside}>
                    <AsideAds data={siteMetadata.sponsored} />
                    <AsideSeries seriesList={siteMetadata.series_list} />
                </section>
            </Container>
        </Layout>
    );
};

export const seriesQuery = graphql`
    query ArticlesBySeries($name: String!) {
        articles: allMarkdownRemark(
            filter: { frontmatter: { series: { eq: $name } } }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        featuredImage
                        summary
                        reddit
                        series
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
        metadata: site {
            siteMetadata {
                url
                descriptions {
                    articles
                }
                series_list {
                    slug
                    name
                    featuredImage
                }
                sponsored {
                    priority
                    name
                    image
                    text
                    url
                }
            }
        }
    }
`;

SeriesArticlesTemplate.propTypes = {
    data: PropTypes.object.isRequired
};

export default SeriesArticlesTemplate;
