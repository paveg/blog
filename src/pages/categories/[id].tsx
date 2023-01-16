import { ParsedUrlQuery } from 'querystring';
import { Loader } from '@mantine/core';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ListPaper } from '@/components/article/listPaper';
import { PageSeo } from '@/components/seo';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';
import { Category } from '@/types/category';

type Props = {
  category: Category;
  articles: Article[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await cmsClient.getList({
    endpoint: 'categories',
    queries: { limit: 9999 }
  });
  const paths = data.contents.map((content: Category) => `/categories/${content.id}`);

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}): Promise<GetStaticPropsResult<Props>> => {
  if (!params?.id) throw new Error('params id not found');
  const id = params?.id;
  const category = await cmsClient
    .get({
      endpoint: 'categories',
      contentId: String(id)
    })
    .catch((err) => console.error(err));

  if (!category) {
    return {
      notFound: true
    };
  }

  const data = await cmsClient.getList({
    endpoint: 'articles',
    queries: {
      filters: `category[equals]${category.id}`,
      limit: 20
    }
  });
  const articles = data.contents;

  return {
    props: {
      category,
      articles
    }
  };
};

const Category: NextPage<Props> = ({ category, articles }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <PageSeo
        description={`${category.name}のページです。関連するカテゴリの記事が一覧になっています。`}
        title={`${category.name}`}
      />
      <ListPaper articles={articles} id={`${category.id}-articles`} noBadge title={category.name} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default React.memo(Category);
