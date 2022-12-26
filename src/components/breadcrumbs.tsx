import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export const Breadcrumbs: FC = () => {
  const router = useRouter();
  if (router.asPath === '/') return <></>;

  const paths = decodeURI(router.asPath).substring(1).split('/');
  const roots = [''];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + '/' + paths[i]);

  const items = paths.map((x, index) => (
    <Anchor component={Link} href={roots[index + 1]} key={index}>
      {x}
    </Anchor>
  ));

  items.unshift(
    <Anchor component={Link} href='/' key={-1}>
      Home
    </Anchor>
  );

  return (
    <MantineBreadcrumbs aria-label='breadcrumb' separator='>'>
      {items}
    </MantineBreadcrumbs>
  );
};
