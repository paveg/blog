import { Text } from '@mantine/core';
import React, { FC, ComponentProps } from 'react';

type ParagraphProps = {
  children?: React.ReactNode;
} & Omit<ComponentProps<'p'>, 'children'>;

export const Paragraph: FC<ParagraphProps> = ({ children }: ParagraphProps) => {
  return (
    <Text
      sx={{
        lineHeight: 1.9
      }}
    >
      {children}
    </Text>
  );
};
