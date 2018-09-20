import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import Container from 'components/Container';
import About from '../../content/about-me.json';
import shortid from 'shortid';
import './about-me.scss';

const AboutMe = () => (
    <Layout section="aboutme">
        <Helmet title="About me" />
        <Container classes="about-me">
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

export default AboutMe;
