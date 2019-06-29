import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from 'components/Container';
import About from '../../content/about-me.json';
import shortid from 'shortid';
import styles from './about-me.module.scss';

const AboutMe = ({ data }) => (
    <Layout section="aboutme" classes={styles.layout}>
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
        <Container classes={styles.aboutMe}>
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
