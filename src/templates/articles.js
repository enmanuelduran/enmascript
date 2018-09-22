import React from 'react';
import Helmet from 'react-helmet';
import Container from 'components/Container/Container';
import Layout from 'components/layout';
import { graphql } from 'gatsby';
import { Twitter, Facebook, LinkedIn } from 'components/Icons/SocialIcons';

const ArticleTemplate = ({ data }) => {
    const post = data.article;
    const metadata = data.metadata;
    const url = metadata.siteMetadata.url + data.article.fields.slug;

    const shareOn = network => event => {
        event.preventDefault();

        const networks = {
            twitter:
                `https://twitter.com/share?url=${url}`,
            facebook:
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedIn:
                `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
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

    const postImage = require(`../../content/images/${
        post.frontmatter.featuredImage
    }`);

    return (
        <Layout section="articles">
            <Container type="article">
                <Helmet
                    title={post.frontmatter.title}
                    meta={[
                        /* Facebook and LinkedIn*/
                        { name: 'og:title', content: post.frontmatter.title },
                        { name: 'og:description', content: post.frontmatter.summary },
                        { name: 'og:image', content: postImage },
                        { name: 'og:url', content: url },
                        { name: 'og:site_name', content: metadata.siteMetadata.title },

                        /* Twitter */
                        { name: 'twitter:title', content: post.frontmatter.title },
                        { name: 'twitter:description', content: post.frontmatter.summary },
                        { name: 'twitter:image', content: postImage },
                        { name: 'twitter:card', content: 'summary_large_image' }
                    ]}
                />
                <div className="article">
                    <h1>{post.frontmatter.title}</h1>
                    <div className="">
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
                    <div className="article__content">
                        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
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
            }
        }
        metadata: site {
            siteMetadata {
                author
                twitter
                title
                url
            }
        }
    }
`;

export default ArticleTemplate;
