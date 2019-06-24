import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from 'components/Container';

const Contact = ({ data }) => (
    <Layout section="contact" classes="articles__layout">
        <Helmet
            title="Contact"
            meta={[
                {
                    name: 'description',
                    content: data.site.siteMetadata.descriptions.contact
                },
                {
                    name: 'og:description',
                    content: data.site.siteMetadata.descriptions.contact
                },
                {
                    name: 'twitter:description',
                    content: data.site.siteMetadata.descriptions.contact
                }
            ]}>
            <link
                rel="canonical"
                href={`${data.site.siteMetadata.url}/contact`}
            />
        </Helmet>
        <Container classes="contact">
            <h2>Contact</h2>
            <p>
                I always try to connect with the people that contacts me, feel
                free to send me an email to{' '}
                <strong>contact@enmascript.com</strong> to talk about
                technology, share knowledge, if you're looking for advice or any
                other reason you may consider might be interesting to talk
                about, the only thing I'll ask you to do is to be professional
                and respectful.
            </p>

            <h2>Advertising</h2>
            <p>
                If you're looking to promote a product or service in the site,
                you can send me an email to{' '}
                <strong>business@enmascript.com</strong> explaining the details
                and I'll come back to you as soon as possible (usually in less
                than 24 hours).
            </p>
        </Container>
    </Layout>
);

export const ContactQuery = graphql`
    query ContactQuery {
        site {
            siteMetadata {
                url
                descriptions {
                    contact
                }
            }
        }
    }
`;
export default Contact;
