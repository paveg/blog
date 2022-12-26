import { NextPage } from 'next';
import React from 'react';
import { ArticleCard } from '../components/articleCard';
import { cmsClient } from '../lib/microcms';
import { Article } from '../types/article';

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }: Props) => {
  return (
    <>
      {articles.map((item: Article) => (
        <ArticleCard
          category={item.category.name}
          date={item.publishedAt}
          id={item.id}
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
      articles: data.contents
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default Home;
