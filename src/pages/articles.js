import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Container from '../components/Container';
import ArticleCard from '../components/ArticleCard';
import AsideAds from '../components/AsideAds';
import AsideSeries from '../components/AsideSeries';
import * as styles from './articles.module.scss';
import * as containerStyles from '../components/Container/Container.module.scss';
import Aside from '../components/Aside';
import { getSeries } from '../helpers/articles';

const Articles = ({ data }) => {
    const { edges: posts } = data.articles;
    const siteMetadata = data.metadata.siteMetadata;

    return (
        <Layout section="articles">
            <Helmet
                title="Articles"
                meta={[
                    {
                        name: 'description',
                        content:
                            data.metadata.siteMetadata.descriptions.articles
                    },
                    {
                        name: 'og:description',
                        content:
                            data.metadata.siteMetadata.descriptions.articles
                    },
                    {
                        name: 'twitter:description',
                        content:
                            data.metadata.siteMetadata.descriptions.articles
                    }
                ]}>
                <link
                    rel="canonical"
                    href={`${data.metadata.siteMetadata.url}/articles`}
                />
            </Helmet>

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
                <Aside>
                    <AsideAds data={siteMetadata.sponsored} />
                    <AsideSeries seriesList={siteMetadata.series_list} />
                </Aside>
            </Container>
        </Layout>
    );
};

Articles.propTypes = {
    data: PropTypes.object.isRequired
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

export default Articles;
