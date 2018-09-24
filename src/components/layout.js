import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Favicon16 from 'images/favicon-16x16.png';
import Favicon32 from 'images/favicon-32x32.png';
import AppleTouchIcon from 'images/apple-touch-icon.png';

const Layout = ({ children, section, classes }) => {
    return (
        <StaticQuery
            query={graphql`
                query SiteTitleQuery {
                    site {
                        siteMetadata {
                            title
                            description
                            author
                            url
                            logo
                        }
                    }
                }
            `}
            render={data => (
                <>
                    <Helmet
                        title={data.site.siteMetadata.title}
                        meta={[
                            { name: 'description', content: data.site.siteMetadata.description },
                            { name: 'author', content: data.site.siteMetadata.author },

                            /* Facebook and LinkedIn*/
                            { name: 'og:locale', content: 'en_US' },
                            { name: 'og:title', content: data.site.siteMetadata.title },
                            { name: 'og:description', content: data.site.siteMetadata.description },
                            { name: 'og:image', content: data.site.siteMetadata.logo },
                            { name: 'og:url', content: data.site.siteMetadata.url },
                            { name: 'og:site_name', content: data.site.siteMetadata.title },

                            /* Twitter */
                            { name: 'twitter:title', content: data.site.siteMetadata.title },
                            { name: 'twitter:description', content: data.site.siteMetadata.description },
                            { name: 'twitter:image', content: data.site.siteMetadata.logo },
                            { name: 'twitter:card', content: 'summary_large_image' }
                        ]}>
                        <html lang="en" />
                        <link rel="canonical" href={data.site.siteMetadata.url}></link>
                        <link
                            href="https://fonts.googleapis.com/css?family=Raleway:400,700"
                            rel="stylesheet"
                        />
                        <link rel="apple-touch-icon" sizes="180x180" href={AppleTouchIcon}></link>
                        <link rel="icon" type="image/png" sizes="32x32" href={Favicon32} />
                        <link rel="icon" type="image/png" sizes="16x16" href={Favicon16} />
                    </Helmet>
                    <div className={`main ${classes}`}>
                        <Header
                            title={data.site.siteMetadata.title}
                            section={section}
                        />
                        {children}
                    </div>
                    <Footer />
                </>
            )}
        />
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    section: PropTypes.string.isRequired,
    classes: PropTypes.string
};

Layout.defaultProps = {
    classes: ''
};

export default Layout;
