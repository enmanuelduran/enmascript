module.exports = {
    siteMetadata: {
        url: 'https://enmascript.com',
        siteUrl: 'https://enmascript.com',
        title: 'EnmaScript',
        author: 'Enmanuel Durán',
        twitter: 'https://twitter.com/duranenmanuel',
        disqusShortName: 'enmascript-1',
        description:
            'A place to learn about programming, web development and science (sometimes).',
        logo: 'https://enmascript.com/favicons/enmascript.png',
        series: 'none',
        reddit: null,
        descriptions: {
            articles:
                'Technical articles related to software development and performance',
            code:
                'Useful modules and functionalities ready to be used and installed in your projects',
            series:
                'Articles grouped by series like React, Performance, Javascript, Styling and more...',
            contact:
                'If you have any question or just want to talk, get it touch!',
            about: 'Learn about the people behind the project'
        },
        sponsored: [
            {
                priority: 1,
                name: 'MediaQuerySensor',
                image:
                    'https://enmascript.com/images/promoted/promoted-2019-03-09.png',
                text:
                    'MediaQuerySensor is a lightweight library that helps you execute functions based on media query breakpoints instead of the every resize event.',
                url: 'https://github.com/enmanuelduran/mediaquerysensor',
            },
            {
                priority: 2,
                name: 'Why I prefer objects over switch statements',
                image:
                    '/images/2018-10-22-objects-over-switch.png',
                text:
                    'Explore a different and scalable way of treating multiple conditionals. No switch, no else if.',
                url: 'https://enmascript.com/articles/2018/10/22/why-I-prefer-objects-over-switch-statements',
            }
        ],
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
            },
            {
                name: 'CSS, Styling and Preprocessors',
                featuredImage: 'css_styling_preprocessors.png',
                slug: '/series/css-styling-and-preprocessors'
            },
            {
                name: 'Performance',
                featuredImage: 'performance.png',
                slug: '/series/performance'
            }
        ],
        code_list: [
            {
                name: 'MediaQuerySensor',
                featuredImage: 'MQS.png',
                slug: '/code/mediaquerysensor'
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
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 750
                        }
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            aliases: {}
                        }
                    },
                    `gatsby-remark-autolink-headers`,
                    `gatsby-remark-reading-time`
                ]
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'EnmaScript',
                short_name: 'EnmaScript',
                start_url: '/',
                background_color: '#FFFFFF',
                theme_color: '#FFFFFF',
                display: 'standalone',
                icons: [
                    {
                        src: `/favicons/icon-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`
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
                trackingId: 'UA-35155594-7',
                head: true,
                anonymize: true,
                respectDNT: true
            }
        },
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
                endpoint:
                    'https://enmanuelduran.us11.list-manage.com/subscribe/post?u=f288b4ae1f9a7fc49eb3c8d59&amp;id=ab12b7f829'
            }
        },
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
                id: 'GTM-WKCMHK7',
                includeInDevelopment: true
            }
        }
    ]
};
