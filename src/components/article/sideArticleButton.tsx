import { Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import Link from 'next/link';
import React, { FC } from 'react';
import { Article } from '../../types/article';

type Props = {
  prevEntry?: Article;
  nextEntry?: Article;
};

export const SideArticleButton: FC<Props> = ({ prevEntry, nextEntry }: Props) => {
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
          variant='light'
        >
          前の記事
        </Button>
      )}
      {nextEntry?.id && (
        <Button
          compact
          component={Link}
          href={`/articles/${nextEntry?.id}`}
          rightIcon={<IconChevronRight />}
          type='button'
          variant='light'
        >
          次の記事
        </Button>
      )}
    </Button.Group>
  );
};