require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `Phoenix.`,
    description: `A personal blogging theme for Gatsby with great typography and dark mode.`,
    siteUrl: process.env.SITE_URL,
    startUrl: `/`,
    copyright: `© YYYY Phoenix. All rights reserved.`,
    author: 'BangDen',
    icon: `src/images/icon.png`,
    logo: `logo.png`,
    color: `#18dcff`,
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
      },
      {
        name: `Blog`,
        link: `/blog`,
      },
      {
        name: `Podcast`,
        link: `/podcast`,
      },
      {
        name: `Portfolio`,
        link: `/portfolio`,
      },
      {
        name: `Photography`,
        link: `/photography`,
      },
      {
        name: `About`,
        link: `/about`,
      },
      {
        name: `Contact`,
        link: `/contact`,
      },
    ],
    socialLinks: [
      {
        name: `Twitter`,
        url: `https://twitter.com/arshadcn`,
        icon: `twitter`,
      },
      {
        name: `Github`,
        url: `https://github.com/arshad`,
        icon: `github`,
      },
      {
        name: `Youtube`,
        url: `https://youtube.com`,
        icon: `youtube`,
      },
    ],
  },
  
  plugins: [
    {
      resolve: 'gatsby-plugin-feed-generator',
      options: {
      generator: `GatsbyJS`,
      rss: true, // Set to true to enable rss generation
      json: true, // Set to true to enable json feed generation
      siteQuery: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              author
            }
          }
        }
      `,
      feeds: [
        {
          name: 'feed', // This determines the name of your feed file => feed.json & feed.xml
          query: `
          {
            allMarkdownRemark(
              sort: {order: DESC, fields: [frontmatter___date]},
              limit: 100,
              ) {
              edges {
                node {
                  html
                  frontmatter {
                    date
                    path
                    title
                  }
                }
              }
            }
          }
          `,
          normalize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return {
                title: edge.node.frontmatter.title,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                html: edge.node.html,
              }
            })
          },
        },
      ],
    },
    // This is a list of all themes that this starter is using.
    // To disable a theme, remove it here and run `yarn remove @arshad/gatsby-theme-NAME`.
    `gatsby-plugin-advanced-sitemap`,
    `@arshad/gatsby-theme-blog-core`,
    `@arshad/gatsby-theme-page-core`,
    `@arshad/gatsby-theme-portfolio-core`,
    `@arshad/gatsby-theme-photo-core`,
    {
      resolve: `@arshad/gatsby-theme-podcast-core`,
      options: {
        feedUrl: `https://feeds.megaphone.fm/travelgenius`,
        podcast: {
          name: `Travel Genuis`,
          description: `Eligendi nisi nobis nisi voluptate. Corporis deserunt provident hic numquam. Veritatis vero necessitatibus adipisci cumque voluptate rerum at.`,
          image: `assets/images/podcast.jpg`,
          social: [
            {
              name: `Apple Podcast`,
              url: `https://itunes.apple.com`,
            },
            {
              name: `Google Podcast`,
              url: `https://podcasts.google.com`,
            },
          ],
        },
      },
    },
    
    `@arshad/gatsby-theme-phoenix`,
  ],
}
