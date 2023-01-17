import { Image, ImageProps, Title, TitleProps } from '@mantine/core';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React, { FC } from 'react';
import { Code } from '@/components/parts/mdx/code';

const mdxComponents = {
  // TODO: Fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props: any) => <Code {...props} />,
  img: (props: ImageProps) => {
    return <Image alt={props.alt} {...props} />;
  },
  h2: (props: TitleProps) => <Title {...props} order={2} />,
  h3: (props: TitleProps) => <Title {...props} order={3} />,
  h4: (props: TitleProps) => <Title {...props} order={4} />,
  h5: (props: TitleProps) => <Title {...props} order={5} />
};

export const Mdx: FC<MDXRemoteProps> = (props: MDXRemoteProps) => {
  return (
    <div id='mdx-container'>
      <MDXRemote {...props} components={mdxComponents} />
    </div>
  );
};
