import { Loader } from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ListPaper } from '@/components/article/listPaper';
import { PageSeo } from '@/components/seo';
import { fetchPopularPosts } from '@/lib/ga';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';
import { PopularData } from '@/types/popularData';

type Props = {
  articles: Article[];
  popularData: PopularData[];
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await cmsClient.getList({
    endpoint: 'articles'
  });
  const popularData = await fetchPopularPosts('14daysAgo', 15);
  return {
    props: {
      articles: data.contents,
      popularData
    }
  };
};

const Popular: NextPage<Props> = ({ articles, popularData }: Props) => {
  const router = useRouter();

  if (router.isFallback || !articles) {
    return <Loader />;
  }

  const popularArticles: Article[] = popularData
    .map((pd: PopularData) => {
      return articles.find((article: Article) => `/articles/${article.id}` === pd.path);
    })
    .filter((article): article is Exclude<typeof article, undefined> => article !== undefined)
    .slice(0, 12);

  return (
    <>
      <PageSeo
        description={`人気記事の一覧ページです。よく読まれている記事を一覧表示しています。`}
        title={'人気記事一覧'}
      />
      <ListPaper articles={popularArticles} id='popular-articles' title='人気記事一覧' />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Popular;
