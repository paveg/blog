import type { NextPage } from 'next';
import Link from 'next/link';

import { cmsClient } from '../lib/microcms';
import { Blog } from '../types/blog';
import { ArticleCard } from '../components/articleCard';

const Home: NextPage = (blog) => {
  const blogs: Blog[] = blog.blogs;
  return (
    <div>
      <ul>
        {blogs.map((item: Blog) => (
          <ArticleCard
            title={item.title}
            date={item.publishedAt}
            category={item.category.name}
            image={item.eyecatch.url}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await cmsClient.get({ endpoint: 'blogs' });

  return {
    props: {
      blogs: data.contents
    }
  };
};

export default Home;
