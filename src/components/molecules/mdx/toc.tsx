import { Blockquote, Text } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import React, { FC } from 'react';

export type Props = {
  children: React.ReactNode;
};

export const Toc: FC<Props> = ({ children, ...props }: Props) => {
  return (
    <Blockquote
      icon={<IconPencil />}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        backgroundColor:
          theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[9],
        marginTop: '24px',
        marginBottom: '24px'
      })}
      {...props}
    >
      <Text fw='700' id='outline'>
        目次
      </Text>
      {children}
    </Blockquote>
  );
};
