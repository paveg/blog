import { GetServerSidePropsContext } from 'next';
import { generateRssFeed } from '@/lib/feed';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateRssFeed('rss');

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Continue to cache in 24 hours
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.end(xml);

  return {
    props: {}
  };
};
const Feed = () => null;

// eslint-disable-next-line import/no-default-export
export default Feed;
