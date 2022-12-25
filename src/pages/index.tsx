import { NextPage } from 'next';
import React from 'react';
import { ArticleCard } from '../components/articleCard';
import { cmsClient } from '../lib/microcms';
import { Blog } from '../types/blog';

type Props = {
  blogs: Blog[];
};

const Home: NextPage<Props> = ({ blogs }: Props) => {
  return (
    <>
      {blogs.map((item: Blog) => (
        <ArticleCard
          category={item.category.name}
          date={item.publishedAt}
          image={item.eyecatch.url}
          key={item.id}
          title={item.title}
        />
      ))}
    </>
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

// eslint-disable-next-line import/no-default-export
export default Home;
