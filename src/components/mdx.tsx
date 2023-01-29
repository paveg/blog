import {
  Image,
  Table,
  Blockquote,
  List,
  ImageProps,
  ListProps,
  ListItemProps,
  BlockquoteProps,
  TableProps,
  Text
} from '@mantine/core';
import { IconBlockquote } from '@tabler/icons';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React, { FC } from 'react';
import type { MDXComponents } from 'mdx/types';
import { CustomLink, CustomLinkProps } from '@/components/atoms/mdx/customLink';
import { CodeBlock } from '@/components/molecules/mdx/codeBlock';
import { DetailArea } from '@/components/molecules/mdx/detailArea';
import { GoogleMap } from '@/components/molecules/mdx/GoogleMap';
import { Heading, HeadingProps } from '@/components/molecules/mdx/heading';
import { LinkWidget, LinkWidgetProps } from '@/components/molecules/mdx/linkWidget';
import { NoticeCard } from '@/components/molecules/mdx/noticeCard';
import { Paragraph } from '@/components/molecules/mdx/paragraph';
import { Toc } from '@/components/molecules/mdx/toc';
import { YouTube } from '@/components/molecules/mdx/YouTube';

type ProvidedComponents = MDXComponents & {
  a?: typeof CustomLink;
  extlink?: typeof LinkWidget;
};

const mdxComponents = {
  blockquote: (props: BlockquoteProps) => {
    return (
      <Blockquote
        icon={<IconBlockquote />}
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          backgroundColor:
            theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[9],
          marginTop: '16px',
          marginBottom: '16px'
        })}
        {...props}
      >
        <Text fz='sm' inherit={false} italic underline variant='text' weight={500}>
          {props.children}
        </Text>
      </Blockquote>
    );
  },
  code: CodeBlock,
  extlink: (props: LinkWidgetProps) => <LinkWidget {...props} />,
  a: (props: CustomLinkProps) => <CustomLink {...props} />,
  img: (props: ImageProps) => <Image {...props} radius='md' />,
  h1: (props: HeadingProps) => <Heading {...props} order={1} />,
  h2: (props: HeadingProps) => <Heading {...props} order={2} />,
  h3: (props: HeadingProps) => <Heading {...props} order={3} />,
  h4: (props: HeadingProps) => <Heading {...props} order={4} />,
  h5: (props: HeadingProps) => <Heading {...props} order={5} />,
  h6: (props: HeadingProps) => <Heading {...props} order={6} />,
  ul: (props: ListProps) => <List {...props} m={10} type='unordered' />,
  ol: (props: ListProps) => <List {...props} m={10} type='ordered' />,
  li: (props: ListItemProps) => <List.Item {...props} />,
  p: Paragraph,
  notice: NoticeCard,
  youtube: YouTube,
  googlemap: GoogleMap,
  details: DetailArea,
  nav: Toc,
  table: (props: TableProps) => (
    <Table {...props} highlightOnHover m={10} striped verticalSpacing='sm' withColumnBorders />
  )
} as never & ProvidedComponents;

export const Mdx: FC<MDXRemoteProps> = (props: MDXRemoteProps) => {
  return (
    <div id='mdx-container'>
      <MDXRemote {...props} components={mdxComponents} />
    </div>
  );
};
