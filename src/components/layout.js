import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Favicon16 from '../images/favicon-16x16.png';
import Favicon32 from '../images/favicon-32x32.png';
import AppleTouchIcon from '../images/apple-touch-icon.png';
import * as styles from './Layout.module.scss';

const Layout = ({ children, section, classes }) => (
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
        render={data => {
            const {
                title,
                author,
                description,
                logo,
                url
            } = data.site.siteMetadata;

            return (
                <React.Fragment>
                    <Helmet
                        title={title}
                        meta={[
                            { name: 'description', content: description },
                            { name: 'author', content: author },

                            /* Facebook and LinkedIn*/
                            { name: 'og:locale', content: 'en_US' },
                            { name: 'og:title', content: title },
                            { name: 'og:description', content: description },
                            { name: 'og:image', content: logo },
                            { name: 'og:url', content: url },
                            { name: 'og:site_name', content: title },

                            /* Twitter */
                            { name: 'twitter:title', content: title },
                            {
                                name: 'twitter:description',
                                content: description
                            },
                            { name: 'twitter:image', content: logo },
                            {
                                name: 'twitter:card',
                                content: 'summary_large_image'
                            }
                        ]}>
                        <html lang="en" />
                        <link rel="canonical" href={url} />
                        <link
                            href="https://fonts.googleapis.com/css?family=Raleway:400,700"
                            rel="stylesheet"
                        />
                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href={AppleTouchIcon}
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="32x32"
                            href={Favicon32}
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="16x16"
                            href={Favicon16}
                        />
                    </Helmet>
                    <div className={styles.mainLayout}>
                        <Header title={title} section={section} />
                        {children}
                    </div>
                    <Footer />
                </React.Fragment>
            );
        }}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    section: PropTypes.string.isRequired,
    classes: PropTypes.string
};

Layout.defaultProps = {
    classes: ''
};

export default Layout;
