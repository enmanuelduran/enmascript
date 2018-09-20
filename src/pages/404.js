import React from 'react';
import Layout from 'components/layout';
import Container from 'components/Container';
import { Link } from 'gatsby';

const NotFoundPage = () => (
    <Layout>
        <Container>
            <h1>Tried looking for it, but it was a 404 Not Found</h1>
            <p>
                I know, it's sad, but maybe going to the
                <Link to="/"> home</Link> will make you feel better?
            </p>
        </Container>
    </Layout>
);

export default NotFoundPage;
