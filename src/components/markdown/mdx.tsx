import React, { FC } from 'react';
import 'zenn-content-css';

type Props = {
  content: string;
};

export const OldMdx: FC<Props> = ({ content }: Props) => {
  return (
    <div
      className='znc'
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  );
};
