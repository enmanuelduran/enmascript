module.exports = {
    siteMetadata: {
        url: 'http://enmanuelduran.com',
        title: 'Enmanuel Durán Blog',
        author: 'Enmanuel Durán',
        twitter: 'https://twitter.com/duranenmanuel',
        series: 'none',
        series_list: [
            {
                name: 'React',
                featuredImage: 'react.png',
                slug: '/series/react'
            },
            {
                name: 'Javascript',
                featuredImage: 'javascript.png',
                slug: '/series/javascript'
            }
        ]
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-transformer-remark`,
        'gatsby-plugin-offline',
        `gatsby-plugin-sass`,
        `gatsby-link`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-catch-links`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 750
                        }
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: 'language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {}
                        }
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Enmanuel Duran Blog',
                short_name: 'Enmanuel Blog',
                start_url: '/',
                background_color: '#FFFFFF',
                theme_color: '#FFFFFF',
                display: 'standalone',
                icons: [
                    {
                        src: `/favicons/icon-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    }
                ]
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content',
                path: `${__dirname}/content/`
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-35155594-7",
                head: true,
                anonymize: true,
                respectDNT: true
            },
        },
    ]
};
