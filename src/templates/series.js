import React from 'react';
import Container from 'components/Container';
import Helmet from 'react-helmet';
import Layout from 'components/layout';
import { graphql } from 'gatsby';
import ArticleCard from 'components/ArticleCard';

const SeriesArticlesTemplate = ({ data }) => {
    const { edges: posts } = data.articles;
    const siteMetadata = data.metadata.siteMetadata;
    const getSeries = post => {
        return siteMetadata.series_list
            && siteMetadata.series_list.filter(elm =>
            post.frontmatter.series.includes(elm.name)
        );
    };
    const sponsoredHeroCta = siteMetadata.sponsored.find(
        ad => ad.priority === 1
    );

    return (
        <Layout section="series">
            <Helmet title="Series" />
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
                <section className="home__ads">
                    <div className="home__ad">
                        <img
                            src={sponsoredHeroCta.image}
                            alt={sponsoredHeroCta.name}
                        />
                    </div>
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
                }
                sponsored {
                    priority
                    name
                    image
                    text
                }
            }
        }
    }
`;

export default SeriesArticlesTemplate;
