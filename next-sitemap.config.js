/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.funailog.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  }
}
