import { Tooltip } from '@mantine/core';
import Link from 'next/link';
import React, { ComponentProps, FC } from 'react';

export type CustomLinkProps = {
  children: React.ReactNode;
  href?: string;
  id?: string;
} & ComponentProps<'a'>;

export const CustomLink: FC<CustomLinkProps> = ({ children, href, id }: CustomLinkProps) => {
  if (href === undefined) {
    return <a>{children}</a>;
  } else {
    return href.startsWith('/') || href === '' ? (
      <Link href={href}>{children}</Link>
    ) : href.startsWith('#user-content') ? (
      <a aria-describedby='footnote-label' data-footnote-ref href={href} id={id}>
        {children}
      </a>
    ) : href.startsWith('#') ? (
      <a href={href} id={id}>
        {children}
      </a>
    ) : (
      <Tooltip color='blue' label={href} offset={10} transition='pop' withArrow>
        <Link component={Link} href={href} rel='noopener noreferrer' target='_blank'>
          {children}
        </Link>
      </Tooltip>
    );
  }
};
