module.exports = {
  siteMetadata: {
    title: 'おさいふ',
    description: 'ふたりで記録する家計簿アプリ',
    author: '@akanewz',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/asset`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'ふたりでつける家計簿アプリ',
        short_name: 'おさいふ',
        start_url: '/',
        background_color: '#f8ab86',
        theme_color: '#f8ab86',
        display: 'minimal-ui',
        icon: 'src/images/asset/osaifu-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-sass'
  ],
}
