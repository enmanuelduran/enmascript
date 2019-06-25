import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from 'components/layout';
import Container from 'components/Container';
import ArticleCard from 'components/ArticleCard';
import AsideAds from 'components/AsideAds';
import AsideSeries from 'components/AsideSeries';

const Articles = ({ data }) => {
    const { edges: posts } = data.articles;
    const siteMetadata = data.metadata.siteMetadata;
    const getSeries = post => {
        return siteMetadata.series_list
            && siteMetadata.series_list.filter(elm =>
                post.frontmatter.series.includes(elm.name)
            );
    };

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

            <Container classes="home__container articles__container">
                <section className="home__articles">
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
                                series={getSeries(post)}
                                reddit={post.frontmatter.reddit}
                            />
                        })}
                </section>
                <section className="aside">
                    <AsideAds data={siteMetadata.sponsored} />
                    <AsideSeries seriesList={siteMetadata.series_list} />
            </section>
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
