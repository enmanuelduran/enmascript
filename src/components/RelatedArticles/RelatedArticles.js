import React from 'react';
import ArticleCard from 'components/ArticleCard';
import Container from 'components/Container/Container';
import styles from './RelatedArticles.module.scss';
import containerStyles from 'components/Container/Container.module.scss';
import { getSeries } from 'helpers/articles';

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
                            series={getSeries(post, siteMetadata)}
                            classes={styles.relatedCard}
                            titleClass={styles.relatedCardTitle}
                            imageClass={styles.relatedImage}
                        />
                    ))}
            </div>
        </Container>
    </div>
);

export default RelatedArticles;
