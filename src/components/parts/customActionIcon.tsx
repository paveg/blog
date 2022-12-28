import { ActionIcon, MantineNumberSize } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  Icon?: React.ReactNode;
  href: string;
  external?: boolean;
  size?: MantineNumberSize;
};
export const CustomActionIcon: FC<Props> = ({ href, Icon, external, size }: Props) => {
  return (
    <ActionIcon
      component={Link}
      href={href}
      rel={external ? 'noopener noreferrer' : ''}
      size={size || 'md'}
      target={external ? '_blank' : ''}
    >
      {Icon}
    </ActionIcon>
  );
};
