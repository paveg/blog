import { Button, MediaQuery, useMantineColorScheme } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import Link from 'next/link';
import React, { FC } from 'react';
import { Article } from '@/types/article';

type Props = {
  prevEntry?: Article;
  nextEntry?: Article;
};

export const SideArticleButton: FC<Props> = ({ prevEntry, nextEntry }: Props) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Button.Group>
      {prevEntry?.id && (
        <MediaQuery query='(max-width: 767px)' styles={{ maxWidth: '12rem' }}>
          <Button
            compact
            component={Link}
            href={`/articles/${prevEntry?.id}`}
            leftIcon={<IconChevronLeft />}
            mr={nextEntry?.id ? 10 : 0}
            type='button'
            variant={colorScheme === 'light' ? 'light' : 'default'}
          >
            {prevEntry?.title || '前の記事'}
          </Button>
        </MediaQuery>
      )}
      {nextEntry?.id && (
        <MediaQuery query='(max-width: 767px)' styles={{ maxWidth: '12rem' }}>
          <Button
            compact
            component={Link}
            href={`/articles/${nextEntry?.id}`}
            rightIcon={<IconChevronRight />}
            type='button'
            variant={colorScheme === 'light' ? 'light' : 'default'}
          >
            {nextEntry?.title || '次の記事'}
          </Button>
        </MediaQuery>
      )}
    </Button.Group>
  );
};
