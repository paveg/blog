import { Loader, Pagination } from '@mantine/core';
import { NextPage, GetStaticProps, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';
import { ListPaper } from '@/components/molecules/article/listPaper';
import { PageSeo } from '@/components/seo';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';

type Props = {
  articles: Article[];
};

export const getStaticProps: GetStaticProps<Props> = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const data = await cmsClient.getList({
    endpoint: 'articles',
    queries: {
      limit: 9999
    }
  });
  const articles = data.contents;

  return {
    props: {
      articles
    }
  };
};

const Articles: NextPage<Props> = ({ articles }: Props) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);

  const paginate = (array: Array<T>, pageNumber: number, pageSize: number): Array<T> => {
    return {
      pageTotal: Math.ceil(array.length / pageSize) || 1,
      items: array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    };
  };

  if (router.isFallback) {
    return <Loader />;
  }

  const { pageTotal, items } = paginate(articles, activePage, 10);

  return (
    <>
      <PageSeo
        description={`記事一覧のページです。全ての記事が一覧になっています。`}
        title='記事一覧'
      />
      <ListPaper articles={items} id='all-articles' title='記事一覧' />
      <Pagination onChange={setActivePage} page={activePage} position='center' total={pageTotal} />
    </>
  );
};

export default memo(Articles);
