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
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React, { FC } from 'react';
import { TooltipLink } from '@/components/atoms/mdx/tooltipLink';
import { CodeBlock } from '@/components/molecules/mdx/codeBlock';
import { Heading, HeadingProps } from '@/components/molecules/mdx/heading';
import { NoticeCard } from '@/components/molecules/mdx/noticeCard';
import { Paragraph } from '@/components/molecules/mdx/paragraph';
import { DetailArea } from './molecules/mdx/detailArea';
import { GoogleMap } from './molecules/mdx/GoogleMap';
import { YouTube } from './molecules/mdx/YouTube';

const mdxComponents = {
  blockquote: (props: BlockquoteProps) => {
    return (
      <Blockquote
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          backgroundColor:
            theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.gray[9]
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
  a: TooltipLink,
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
  table: (props: TableProps) => (
    <Table {...props} highlightOnHover m={10} striped verticalSpacing='sm' withColumnBorders />
  )
} as never;

export const Mdx: FC<MDXRemoteProps> = (props: MDXRemoteProps) => {
  return (
    <div id='mdx-container'>
      <MDXRemote {...props} components={mdxComponents} />
    </div>
  );
};
