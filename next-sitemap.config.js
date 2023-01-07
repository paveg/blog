/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.funailog.com',
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: [
    additionalSitemaps:[
      'https://www.funailog.com/sitemap.xml'
    ]
  ]
}
