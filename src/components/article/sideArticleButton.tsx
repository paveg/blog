import { Button, useMantineColorScheme } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import Link from 'next/link';
import React, { FC } from 'react';
import { Article } from '../../types/article';

type Props = {
  prevEntry?: Article;
  nextEntry?: Article;
};

export const SideArticleButton: FC<Props> = ({ prevEntry, nextEntry }: Props) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Button.Group>
      {prevEntry?.id && (
        <Button
          compact
          component={Link}
          href={`/articles/${prevEntry?.id}`}
          leftIcon={<IconChevronLeft />}
          mr={nextEntry?.id ? 10 : 0}
          type='button'
          variant={colorScheme === 'light' ? 'light' : 'default'}
        >
          {nextEntry?.title}
        </Button>
      )}
      {nextEntry?.id && (
        <Button
          compact
          component={Link}
          href={`/articles/${nextEntry?.id}`}
          rightIcon={<IconChevronRight />}
          type='button'
          variant={colorScheme === 'light' ? 'light' : 'default'}
        >
          {prevEntry?.title}
        </Button>
      )}
    </Button.Group>
  );
};
