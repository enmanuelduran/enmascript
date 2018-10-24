import React from 'react';
import Helmet from 'react-helmet';
import Container from 'components/Container/Container';
import Layout from 'components/layout';
import { graphql, Link } from 'gatsby';
import { Twitter, Facebook, LinkedIn } from 'components/Icons/SocialIcons';
import ArticleCard from 'components/ArticleCard';
import MailchimpWrapper from 'components/MailchimpWrapper';
import Disqus from 'disqus-react';

const ArticleTemplate = ({ data }) => {
    const { article: post, metadata, otherArticles } = data;
    const url = metadata.siteMetadata.url + data.article.fields.slug;
    const { title } = post.frontmatter;
    const disqusShortname = 'EnmaScript';
    const disqusConfig = { url, title, identifier: url };

    const shareOn = network => event => {
        event.preventDefault();

        const networks = {
            twitter: `https://twitter.com/share?url=${url}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
        };

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

    const getSeriesLink = () => {
        const link = metadata.siteMetadata.series_list.find(elm => {
            return elm.name === post.frontmatter.series;
        });

        return (link && link.slug) || '';
    };

    const postImage = `/images/${post.frontmatter.featuredImage}`;

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
                            {post.frontmatter.date}
                        </span>
                    </div>
                    <div className="article__series">
                        part of the{' '}
                        <Link to={getSeriesLink()}>
                            {' '}
                            {post.frontmatter.series}{' '}
                        </Link>
                        series
                    </div>
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
                        </div>
                    </div>
                </div>
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
                                    image={post.frontmatter.featuredImage}
                                    slug={post.fields.slug}
                                    key={post.id}
                                />
                            ))}
                    </div>
                </div>
                <div className="article__related-title">
                    Leave your comments!
                </div>
                <Disqus.DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                />
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
            }
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                summary
                featuredImage
                series
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
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

export default ArticleTemplate;
