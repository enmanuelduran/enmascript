const { resolve } = require('path');

module.exports = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const articlesTemplate = resolve(`src/templates/articles.js`);

    const articles = await graphql(`
        {
            allMarkdownRemark(
                sort: { frontmatter: { date: DESC } }
                limit: 1000
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 250)
                        html
                        id
                        frontmatter {
                            date
                            title
                            series
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    if (articles.errors) {
        console.error(articles.errors);

        throw Error(articles.errors);
    }

    articles.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: articlesTemplate,
            context: {
                slug: node.fields.slug,
            },
        });
    });

    const seriesTemplate = resolve(`src/templates/series.js`);

    const series = await graphql(`
        {
            site {
                siteMetadata {
                    series_list {
                        name
                        slug
                    }
                }
            }
        }
    `);

    if (series.errors) {
        console.error(series.errors);

        throw Error(series.errors);
    }

    series.data.site.siteMetadata.series_list.forEach((serie) => {
        createPage({
            path: serie.slug,
            component: seriesTemplate,
            context: {
                name: serie.name,
            },
        });
    });
};
