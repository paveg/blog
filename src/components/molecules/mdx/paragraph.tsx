import { Text } from '@mantine/core';
import React, { FC, ComponentProps } from 'react';
import { ErrorNotice } from './errorNotice';
import { SuccessNotice } from './successNotice';
import { WarningNotice } from './warningNotice';

type ParagraphProps = {
  children?: React.ReactNode;
} & Omit<ComponentProps<'p'>, 'children'>;

export const Paragraph: FC<ParagraphProps> = ({ children }: ParagraphProps) => {
  if (!children) {
    return <br />;
  }

  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  if (children.startsWith('::warning')) {
    return <WarningNotice>{children}</WarningNotice>;
  }
  if (children.startsWith('::error')) {
    return <ErrorNotice>{children}</ErrorNotice>;
  }
  if (children.startsWith('::success')) {
    return <SuccessNotice>{children}</SuccessNotice>;
  }

  return <Text>{children}</Text>;
};
