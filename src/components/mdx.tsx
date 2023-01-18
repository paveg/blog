import { Image, Table, Blockquote } from '@mantine/core';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React, { FC } from 'react';
import { TooltipLink } from '@/components/atoms/mdx/tooltipLink';
import { CodeBlock } from '@/components/molecules/mdx/codeBlock';
import { Heading } from '@/components/molecules/mdx/heading';
import { Paragraph } from '@/components/molecules/mdx/paragraph';

const mdxComponents = {
  blockquote: (props) => (
    <Blockquote
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.gray[9]
      })}
      {...props}
    />
  ),
  code: CodeBlock,
  a: TooltipLink,
  img: (props) => <Image {...props} radius='md' />,
  h1: (props) => <Heading {...props} order={1} />,
  h2: (props) => <Heading {...props} order={2} />,
  h3: (props) => <Heading {...props} order={3} />,
  h4: (props) => <Heading {...props} order={4} />,
  h5: (props) => <Heading {...props} order={5} />,
  p: Paragraph,
  table: (props) => (
    <Table {...props} highlightOnHover m={10} striped verticalSpacing='sm' withColumnBorders />
  )
};

export const Mdx: FC<MDXRemoteProps> = (props: MDXRemoteProps) => {
  return (
    <div id='mdx-container'>
      <MDXRemote {...props} components={mdxComponents} />
    </div>
  );
};
