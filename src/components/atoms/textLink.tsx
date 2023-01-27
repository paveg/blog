import { Text } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';

type TextLinkProps = { children: React.ReactNode; external?: boolean; href: string };

export const TextLink: FC<TextLinkProps> = ({ external, href, children }: TextLinkProps) => {
  return (
    <Text
      color='blue'
      component={Link}
      href={href}
      rel={external ? 'noopener noreferrer' : ''}
      target={external ? '_blank' : ''}
    >
      {children}
    </Text>
  );
};
