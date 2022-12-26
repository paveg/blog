import React, { FC } from 'react';
import 'zenn-content-css';
import markdownHtml from 'zenn-markdown-html';

type Props = {
  markdown: string;
};

export const Mdx: FC<Props> = ({ markdown }: Props) => {
  return (
    <div
      className='znc'
      dangerouslySetInnerHTML={{
        __html: markdownHtml(markdown)
      }}
    />
  );
};
