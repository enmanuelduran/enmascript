import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import About from '../../content/about-me.json';
import shortid from 'shortid';
import * as styles from './about-me.module.scss';
import * as containerStyles from '../components/Container/Container.module.scss';

const AboutMe = ({ data }) => (
    <Layout section="aboutme">
        <Helmet
            title="About me"
            meta={[
                {
                    name: 'description',
                    content: data.site.siteMetadata.descriptions.about
                },
                {
                    name: 'og:description',
                    content: data.site.siteMetadata.descriptions.about
                },
                {
                    name: 'twitter:description',
                    content: data.site.siteMetadata.descriptions.about
                }
            ]}>
            <link
                rel="canonical"
                href={`${data.site.siteMetadata.url}/about-me`}
            />
        </Helmet>
        <Container classes={`${styles.aboutMe} ${containerStyles.containerPage}`}>
            <p>{About.intro}</p>

            <h2>{About.whatIDo.title}</h2>
            <ul>
                {About.whatIDo.list.map(elm => (
                    <li key={shortid.generate()}>
                        <div dangerouslySetInnerHTML={{ __html: elm }} />
                    </li>
                ))}
            </ul>

            <h2>{About.inThePast.title}</h2>
            <ul>
                {About.inThePast.list.map(elm => (
                    <li key={shortid.generate()}>
                        <div dangerouslySetInnerHTML={{ __html: elm }} />
                    </li>
                ))}
            </ul>

            <h2>{About.more.title}</h2>
            <p>{About.more.text}</p>
            <p dangerouslySetInnerHTML={{ __html: About.spareTime }} />
        </Container>
    </Layout>
);

AboutMe.propTypes = {
    data: PropTypes.object.isRequired
};


export const AboutQuery = graphql`
    query AboutQuery {
        site {
            siteMetadata {
                url
                descriptions {
                    about
                }
            }
        }
    }
`;

export default AboutMe;
