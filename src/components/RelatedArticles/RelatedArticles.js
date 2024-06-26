import React from 'react';
import ArticleCard from '../ArticleCard';
import Container from '../Container/Container';
import * as styles from './RelatedArticles.module.scss';
import * as containerStyles from '../Container/Container.module.scss';
import { getSeries } from '../../helpers/articles';
import PropTypes from 'prop-types';

const RelatedArticles = ({ articles, siteMetadata }) => (
    <div className={styles.related}>
        <Container classes={containerStyles.containerArticle}>
            <div className={styles.relatedTitle}>Other Articles</div>
            <div className={styles.relatedWrapper}>
                {articles.edges
                    .map(({ node: post }) => (
                        <ArticleCard
                            title={post.frontmatter.title}
                            date={post.frontmatter.date}
                            readingTime={post.fields.readingTime.text}
                            image={post.frontmatter.featuredImage}
                            slug={post.fields.slug}
                            key={post.id}
                            summary={post.frontmatter.summary}
                            reddit={post.frontmatter.reddit}
                            leenker={post.frontmatter.leenker}
                            series={getSeries(post, siteMetadata)}
                            classes={styles.relatedCard}
                            titleClass={styles.relatedCardTitle}
                            imageClass={styles.relatedImage}
                            noSocialText
                        />
                    ))}
            </div>
        </Container>
    </div>
);

RelatedArticles.propTypes = {
    articles: PropTypes.object.isRequired,
    siteMetadata: PropTypes.object.isRequired
};

export default RelatedArticles;
