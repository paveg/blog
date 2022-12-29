// eslint-disable-next-line import/no-default-export
export default async (req, res) => {
  if (!req.query.slug) {
    return res.status(404).end();
  }
  const content = await fetch(
    `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY || '' } }
  ).then((res) => res.json());

  if (!content) {
    return res.status(401).json({ message: 'Invalid id' });
  }

  res.setPreviewData({
    draftKey: req.query.draftKey
  });
  res.writeHead(307, { Location: `/articles/preview/${content.id}` });
  res.end();
};
