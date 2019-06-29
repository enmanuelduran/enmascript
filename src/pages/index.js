import React from 'react';
import Layout from 'components/layout';
import Container from 'components/Container';
import { graphql, Link } from 'gatsby';
import Cover from 'components/Cover';
import ArticleCard from 'components/ArticleCard';
import AsideAds from 'components/AsideAds';
import AsideSeries from 'components/AsideSeries';
import CoverImage from 'images/cover.png';
import { Reddit } from 'components/Icons/SocialIcons';
import styles from 'index.module.scss';
import cardStyles from 'components/ArticleCard/ArticleCard.module.scss';
import containerStyles from 'components/Container/Container.module.scss';
import asideStyles from 'components/Common/aside.module.scss';

const Index = ({ data }) => {
    const { edges: posts } = data.homeData;
    const { edges: coverPost } = data.coverData;
    const siteMetadata = data.metadata.siteMetadata;
    const getSeries = post => {
        return siteMetadata.series_list
            && siteMetadata.series_list.filter(elm =>
            post.frontmatter.series.includes(elm.name)
        );
    };
    const [sponsoredHeroCta, ...sponsoredList] = siteMetadata.sponsored;

    return (
        <Layout section="home">
            <Cover image={CoverImage} classes={styles.homeCover}>
                <Container classes={`${styles.homeCoverContainer} ${containerStyles.containerPage}`}>
                    {coverPost.map(({ node: post }) => (
                        <div className={styles.homeCoverCtaArticle} key={post.id}>
                            <div>
                                <div className={styles.homeCoverCtaRelevantFlag}>Relevant now</div>
                                <div className={styles.homeCoverCtaDate}>{post.frontmatter.date}</div>
                                <div className={styles.homeCoverCtaReadingTime}>{post.fields.readingTime.text}</div>
                                <h1>
                                    <Link
                                        data-gtm-track="article-cover-cta-click"
                                        to={post.fields.slug}>
                                        {post.frontmatter.title}
                                    </Link>
                                </h1>
                                <p className={styles.homeCoverCtaSummary}>
                                    {post.frontmatter.summary}
                                    <Link
                                        data-gtm-track="article-cover-cta-click"
                                        to={post.fields.slug}>
                                        Read more
                                    </Link>
                                </p>
                                <div className={`${styles.homeCoverCtabuttons} ${cardStyles.cardButtons}`}>
                                {post.frontmatter.reddit && (
                                    <a
                                        href={post.frontmatter.reddit}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cardStyles.cardReddit}>
                                        <Reddit />
                                        <span>Let's talk</span>
                                    </a>
                                )}
                                    {getSeries(post).map(serie =>  (
                                        <div className={styles.homeArticleSeries} key={serie.slug}>
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
                        className={styles.heroPromotedAd}
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

            <Container classes={`${styles.homeContainer} ${containerStyles.containerPage}`}>
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
                                series={getSeries(post)}
                                reddit={post.frontmatter.reddit}
                            />
                        })
                    }
                </section>
                <section className={asideStyles.aside}>
                    <AsideAds data={sponsoredList} />
                    <AsideSeries seriesList={siteMetadata.series_list} />
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
                    url
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
