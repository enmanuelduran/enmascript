import React from 'react';
import Layout from 'components/layout';
import Container from 'components/Container';
import { graphql, Link } from 'gatsby';
import Cover from 'components/Cover';
import ArticleCard from 'components/ArticleCard';
import CoverImage from 'images/cover.png';
import { Reddit } from 'components/Icons/SocialIcons';
import shortid from 'shortid';

const Index = ({ data }) => {
    const { edges: posts } = data.homeData;
    const { edges: coverPost } = data.coverData;
    const siteMetadata = data.metadata.siteMetadata;
    const sponsoredHeroCta = siteMetadata.sponsored.find(
        ad => ad.priority === 1
    );
    const getSeries = post => {
        return siteMetadata.series_list
            && siteMetadata.series_list.filter(elm =>
            post.frontmatter.series.includes(elm.name)
        );
    };

    return (
        <Layout section="home" classes="home">
            <Cover image={CoverImage} classes="home__cover">
                <Container classes="home__cover-container">
                    {coverPost.map(({ node: post }) => (
                        <div className="home__cta-article" key={post.id}>
                            <div className="home__cta-content">
                                <div className="home__relevant-flag">Relevant now</div>
                                <div className="home__date">{post.frontmatter.date}</div>
                                <div className="home__reading-time">{post.fields.readingTime.text}</div>
                                <h1>
                                    <Link
                                        data-gtm-track="article-cover-cta-click"
                                        to={post.fields.slug}>
                                        {post.frontmatter.title}
                                    </Link>
                                </h1>
                                <p className="home__cta-summary">
                                    {post.frontmatter.summary}
                                    <Link
                                        data-gtm-track="article-cover-cta-click"
                                        to={post.fields.slug}>
                                        Read more
                                    </Link>
                                </p>
                                <div className="article-card__buttons">
                                {post.frontmatter.reddit && (
                                    <a
                                        href={post.frontmatter.reddit}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="article-card__reddit">
                                        <Reddit />
                                        <span>Let's talk</span>
                                    </a>
                                )}
                                    {getSeries(post).map(serie =>  (
                                        <div className="article__series" key={serie.slug}>
                                            <Link
                                                to={serie.slug}>
                                                #{serie.name}
                                            </Link>
                                    </div>
                                    ))}
                            </div>
                            </div>
                        </div>
                    ))}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        data-gtm-track="promoted-cover-cta-click"
                        className="hero-promoted-ad"
                        href="https://github.com/enmanuelduran/mediaquerysensor">
                        <img
                            src={sponsoredHeroCta.image}
                            alt={sponsoredHeroCta.name}
                        />
                        <p>{sponsoredHeroCta.text}</p>
                        <span />
                    </a>
                </Container>
            </Cover>

            <Container classes="home__container">
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
                        <div className="aside__ads">
                            <Link target="_blank"
                               rel="noopener noreferrer"
                               className="aside__ad"
                               to="/articles/2018/10/22/why-I-prefer-objects-over-switch-statements">
                                <img
                                    src={siteMetadata.sponsored[1].image}
                                    alt={siteMetadata.sponsored[1].name}
                                />
                                <p className="sponsoredText">{siteMetadata.sponsored[1].text}</p>
                            </Link>
                        </div>
                        <p className="aside__title">Popular Series</p>
                        <div className="aside__series">
                            {siteMetadata.series_list.map(element => {
                                const image = require(`../../content/images/${
                                    element.featuredImage
                                }`);

                                return (
                                    <Link
                                        key={shortid.generate()}
                                        style={{ backgroundImage: `url(${image})` }}
                                        className="series__card series__card--aside"
                                        data-name={element.name}
                                        to={element.slug}
                                    />
                                );
                            })}
                        </div>
                    </section>
            </Container>
        </Layout>
    );
};

export const HomeQuery = graphql`
    query HomeQuery {
        coverData: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        featuredImage
                        date(formatString: "MMMM DD, YYYY")
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
        homeData: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            skip: 1
            limit: 5
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        featuredImage
                        date(formatString: "MMMM DD, YYYY")
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
                sponsored {
                    priority
                    name
                    image
                    text
                }
                series_list {
                    slug
                    name
                    featuredImage
                }
            }
        }
    }
`;

export default Index;
