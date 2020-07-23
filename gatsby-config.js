require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `Phoenix.`,
    description: `A personal blogging theme for Gatsby with great typography and dark mode.`,
    siteUrl: process.env.SITE_URL,
    startUrl: `/`,
    copyright: `© YYYY Phoenix. All rights reserved.`,
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
    `@arshad/gatsby-theme-phoenix`,
  ],
}
