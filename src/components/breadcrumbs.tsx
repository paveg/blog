import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import { IconHomeLink } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

type Props = {
  currentPageTitle?: string;
};

export const Breadcrumbs: FC<Props> = ({ currentPageTitle }: Props) => {
  const router = useRouter();
  if (router.asPath === '/') return <></>;

  const paths = decodeURI(router.asPath).substring(1).split('/');
  const roots = [''];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + '/' + paths[i]);

  const items = paths.map((x, index) => (
    <Anchor component={Link} fz='sm' href={roots[index + 1]} key={index}>
      {paths.length === index + 1 && currentPageTitle ? currentPageTitle : x}
    </Anchor>
  ));

  items.unshift(
    <Anchor component={Link} href='/' key={-1}>
      <IconHomeLink size={14} />
    </Anchor>
  );

  return (
    <>
      <MantineBreadcrumbs aria-label='breadcrumb' mb={20} separator='>'>
        {items}
      </MantineBreadcrumbs>
    </>
  );
};
