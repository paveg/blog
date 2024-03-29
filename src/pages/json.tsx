import { GetServerSidePropsContext } from 'next';
import { generateRssFeed } from '@/lib/feed';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateRssFeed('json');

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Continue to cache in 24 hours
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(xml);

  return {
    props: {}
  };
};
const Json = () => null;

export default Json;
