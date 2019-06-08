import React from 'react';
import Helmet from 'react-helmet';
import Container from 'components/Container/Container';
import Layout from 'components/layout';
import { graphql, Link } from 'gatsby';
import { Twitter, Facebook, LinkedIn, Reddit } from 'components/Icons/SocialIcons';
import ArticleCard from 'components/ArticleCard';
import MailchimpWrapper from 'components/MailchimpWrapper';

const ArticleTemplate = ({ data }) => {
    const { article: post, metadata, otherArticles } = data;
    const url = metadata.siteMetadata.url + data.article.fields.slug;
    const { title } = post.frontmatter;

    const share = () => {
        const networks = {
            twitter: `https://twitter.com/share?url=${url}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
        };

        return network => event => {
            event.preventDefault();

            if (!(network in networks)) {
                return false;
            }

            const networkWindow = window.open(
                networks[network],
                'network-popup',
                'height=350,width=600'
            );

            if (networkWindow.focus) {
                networkWindow.focus();
            }
        };
    };

    const shareOn = share();
    const getSeries = () => {
        return metadata.siteMetadata.series_list.filter(elm =>
            post.frontmatter.series.includes(elm.name)
        );
    };

    const postImage = `/images/${post.frontmatter.featuredImage}`;
    const series = getSeries();
    const twitterDiscussionLink = `https://mobile.twitter.com/search?q=${encodeURIComponent(
        url
    )}`;
    const githubUrl = `https://github.com/enmanuelduran/enmascript/edit/master/content/articles/${
        post.frontmatter.dateGitHub
    }-${post.fields.slug
        .split('/')
        .filter(el => el)
        .pop()}.md`;

    return (
        <Layout section="articles">
            <Container type="article">
                <Helmet
                    title={post.frontmatter.title}
                    meta={[
                        {
                            name: 'description',
                            content: post.frontmatter.summary
                        },

                        /* Facebook and LinkedIn*/
                        { name: 'og:title', content: post.frontmatter.title },
                        {
                            name: 'og:description',
                            content: post.frontmatter.summary
                        },
                        {
                            name: 'og:image',
                            content: metadata.siteMetadata.url + postImage
                        },
                        { name: 'og:url', content: url },
                        {
                            name: 'og:site_name',
                            content: metadata.siteMetadata.title
                        },

                        /* Twitter */
                        {
                            name: 'twitter:title',
                            content: post.frontmatter.title
                        },
                        {
                            name: 'twitter:description',
                            content: post.frontmatter.summary
                        },
                        {
                            name: 'twitter:image',
                            content: metadata.siteMetadata.url + postImage
                        },
                        { name: 'twitter:card', content: 'summary_large_image' }
                    ]}>
                    <link rel="canonical" href={url} />
                </Helmet>
                <div className="article">
                    <h1>{post.frontmatter.title}</h1>
                    <div>
                        <a
                            href={metadata.siteMetadata.twitter}
                            className="article__author"
                            target="_blank"
                            rel="noopener noreferrer">
                            {metadata.siteMetadata.author}
                        </a>
                        <span className="article__date">
                            {post.frontmatter.date} •{' '}
                            <span className="article__readingTime">
                                {data.article.fields.readingTime.text}
                            </span>
                        </span>
                    </div>
                    {series.length > 0 && (
                        <div className="article__series-container">
                            <div className="article__series-head">
                                Part of the Series:
                            </div>
                            {series.map(serie => (
                                <div
                                    className="article__series"
                                    key={serie.slug}>
                                    <Link to={serie.slug}>{serie.name}</Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="article__content">
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                        <div className="article__share">
                            <div onClick={shareOn('twitter')}>
                                <Twitter />
                            </div>
                            <div onClick={shareOn('facebook')}>
                                <Facebook />
                            </div>
                            <div onClick={shareOn('linkedIn')}>
                                <LinkedIn />
                            </div>
                            {
                                post.frontmatter.reddit &&
                                <a
                                    href={post.frontmatter.reddit}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="article__share--reddit">
                                    <Reddit />
                                    <span>Let's talk</span>
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <p className="article__engage-text">
                    <strong>Want to leave a comment?</strong> Do it on{' '}
                    <a
                        href={twitterDiscussionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-gtm-track="twitter-discussion">
                        twitter
                    </a>
                </p>

                <p className="article__engage-text">
                    <strong>Found something to fix in the article?</strong>{' '}
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Edit it and send a Pull Request on GitHub!
                    </a>
                </p>
                <MailchimpWrapper />
                <div className="article__related">
                    <div className="article__related-title">Other Articles</div>
                    <div className="article__related-wrapper">
                        {otherArticles.edges
                            .filter(
                                post => post.node.frontmatter.title.length > 0
                            )
                            .map(({ node: post }) => (
                                <ArticleCard
                                    title={post.frontmatter.title}
                                    date={post.frontmatter.date}
                                    readingTime={post.fields.readingTime.text}
                                    image={post.frontmatter.featuredImage}
                                    slug={post.fields.slug}
                                    key={post.id}
                                />
                            ))}
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export const pageQuery = graphql`
    query ArticlesByPath($slug: String!) {
        article: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            fields {
                slug
                readingTime {
                    text
                }
            }
            frontmatter {
                date: date(formatString: "MMMM DD, YYYY")
                dateGitHub: date(formatString: "YYYY-MM-DD")
                title
                summary
                featuredImage
                series
                reddit
            }
        }
        metadata: site {
            siteMetadata {
                author
                twitter
                title
                url
                series_list {
                    name
                    slug
                }
            }
        }
        otherArticles: allMarkdownRemark(
            filter: { fields: { slug: { ne: $slug } } }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 2
        ) {
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

export default ArticleTemplate;
