import { Alert, AlertProps } from '@mantine/core';
import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
} & AlertProps;

export const NoticeCard: FC<Props> = ({ children, ...props }: Props) => {
  return (
    <Alert m='md' {...props}>
      {children}
    </Alert>
  );
};
