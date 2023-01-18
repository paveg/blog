import { ParsedUrlQuery } from 'querystring';
import {
  Container,
  Divider,
  Group,
  Loader,
  Text,
  Title,
  Box,
  useMantineColorScheme
} from '@mantine/core';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import React from 'react';
import { SideArticleButton } from '@/components/article/sideArticleButton';
import { CategoryBadge } from '@/components/category/badge';
import { Mdx } from '@/components/mdx';
import { MicroCMSPicture } from '@/components/parts/microCmsPicture';
import { ArticleSeo } from '@/components/seo';
import { ShareButtons } from '@/components/shareButtons';
import { siteMetadata } from '@/config/siteMetadata';
import { FormattedDate } from '@/lib/date';
import { m2h } from '@/lib/mdx2html';
import { cmsClient } from '@/lib/microcms';
import { Article as ArticleType } from '@/types/article';

type Props = {
  article: ArticleType;
  mdxSource: MDXRemoteSerializeResult;
  prevEntry: ArticleType;
  nextEntry: ArticleType;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Article: NextPage<Props> = ({ article, mdxSource, prevEntry, nextEntry }: Props) => {
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();

  if (router.isFallback) {
    return <Loader />;
  }

  const date = FormattedDate(article.publishedAt);
  const articleUrl = `${siteMetadata.url}/articles/${article.id}`;

  return (
    <>
      <ArticleSeo
        image={article.eyecatch}
        modifiedAt={article.revisedAt}
        publishedAt={article.publishedAt}
        summary={article.summary}
        title={article.title}
        url={articleUrl}
      />
      <Container>
        <CategoryBadge bottomOffset category={article.category} />
        <Box mb={20}>
          <Text align='center' color={colorScheme == 'light' ? 'gray.7' : 'gray.4'} mb={5}>
            {date}
          </Text>
          <Title align='center' mb={20} order={1} size='h2'>
            {article.title}
          </Title>
          {article.eyecatch && (
            <MicroCMSPicture
              alt='eyecatch'
              height={article.eyecatch.height ?? 0}
              src={article.eyecatch.url}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              width={article.eyecatch.width ?? 0}
            />
          )}
        </Box>

        <Mdx {...mdxSource} lazy />
        <Divider mb={20} mt={40} variant='dashed' />
        <ShareButtons articleTitle={article.title} articleUrl={articleUrl} centered />
        <Group position='center'>
          <SideArticleButton nextEntry={nextEntry} prevEntry={prevEntry} />
        </Group>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}): Promise<GetStaticPropsResult<Props>> => {
  if (!params?.id) throw new Error('params id not found');
  const id = params?.id;

  const article = await cmsClient
    .get({
      endpoint: 'articles',
      contentId: String(id)
    })
    .catch((err) => console.error(err));

  const fields = 'id,title,image,publishedAt';
  const prev = await cmsClient.getList({
    endpoint: 'articles',
    queries: {
      limit: 1,
      orders: '-publishedAt',
      fields,
      filters: `publishedAt[less_than]${article.publishedAt}`
    }
  });
  const next = await cmsClient.getList({
    endpoint: 'articles',
    queries: {
      limit: 1,
      orders: 'publishedAt',
      fields,
      filters: `publishedAt[greater_than]${article.publishedAt}`
    }
  });

  if (!article) {
    return {
      notFound: true
    };
  }

  const prevEntry = prev.contents[0] || {};
  const nextEntry = next.contents[0] || {};

  const code =
    '```python\n# 1+2+3+...+1000000 の実行時間を計測\n\n%%time\nk = 0\nfor x in range(10**6):\n    k += x\n\nprint(k)\n```';
  const mdxSource = await m2h(
    `
# h1

## h2

### h3

#### h4

##### h5

> 引用文 ref:https://github.com/tkc310/microCMS_blog/commit/a9e02da32d07ed5c8b82ca6e1955bfc4ce6908d5

${code}
*abcdefg*
**higklmn**
~opqrstu~
_vwxyz_

---
| Beep |   No.  |   Boop |
| :--- | :----: | -----: |
| beep |  1024  |    xyz |
| boop | 338845 |    tuv |
| foo  |  10106 | qrstuv |
| bar  |   45   |   lmno |

---

- a
  - a1
- b

1. a
2. b

![test](https://images.microcms-assets.io/assets/3ab7834809eb4654a5239e79fba895de/667a731fceea4f1b9aa1478134ce8fae/service-account-step1.jpg?format=auto)

https://twitter.com/paveg_/

https://twitter.com/paveg_/status/1615250728871919616?s=20

::warning
2022/11/03 現在、MacOS のみの対応となっています
::

::error
2022/11/03 現在、MacOS のみの対応となっています
::

::success
2022/11/03 現在、MacOS のみの対応となっています
::

1

2


3



4
    `
  );

  return {
    props: {
      article,
      mdxSource,
      prevEntry,
      nextEntry
    }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await cmsClient.getList({
    endpoint: 'articles',
    queries: { limit: 9999 }
  });
  const paths = data.contents.map((content: ArticleType) => `/articles/${content.id}`);

  return { paths, fallback: true };
};

// eslint-disable-next-line import/no-default-export
export default React.memo(Article);
