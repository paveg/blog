import { Title, TitleProps } from '@mantine/core';
import React, { FC } from 'react';

export type HeadingProps = {
  order?: number;
  children: React.ReactNode;
} & Omit<TitleProps, 'children'>;

export const Heading: FC<HeadingProps> = ({ order, children, ...props }: HeadingProps) => {
  return (
    <Title order={order || 2} {...props}>
      {children}
    </Title>
  );
};
