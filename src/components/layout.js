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
                        }
                    }
                }
            `}
            render={data => (
                <>
                    <Helmet
                        title={data.site.siteMetadata.title}
                        meta={[
                            { name: 'description', content: 'Sample' },
                            { name: 'keywords', content: 'sample, something' }
                        ]}>
                        <html lang="en" />
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
