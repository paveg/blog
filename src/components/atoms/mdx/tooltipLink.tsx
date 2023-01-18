import { Tooltip } from '@mantine/core';
import Link from 'next/link';
import React, { ComponentProps, FC } from 'react';
import { siteMetadata } from '@/config/siteMetadata';
type TooltipLinkProps = {
  children?: React.ReactNode;
} & ComponentProps<'a'>;
export const TooltipLink: FC<TooltipLinkProps> = ({ children, href }: TooltipLinkProps) => {
  if (!href) {
    return <>{children}</>;
  }

  return (
    <Tooltip color='blue' inline label={href} offset={10} transition='pop' withArrow>
      {href.startsWith('/') || href.startsWith(siteMetadata.url) || href === '' ? (
        <Link href={href}>{children ?? ''}</Link>
      ) : (
        <Link href={href} rel={'noopener noreferrer'} target='_blank'>
          {children ?? ''}
        </Link>
      )}
    </Tooltip>
  );
};
