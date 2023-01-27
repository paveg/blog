import { Badge, MantineColor } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { Category, Categories } from '@/types/category';

type Props = {
  category?: Category;
  small?: boolean;
  bottomOffset?: boolean;
  nonLink?: boolean;
};

const CategoryColors = (categoryId: Categories): MantineColor => {
  switch (categoryId) {
    case 'gadget':
      return 'green';
    case 'travel':
      return 'orange';
    case 'technology':
      return 'grape';
    case 'updates':
      return 'pink';
    case 'cars-and-motorcycles':
      return 'cyan';
    default:
      return 'blue';
  }
};

export const CategoryBadge: FC<Props> = ({ nonLink, small, category, bottomOffset }: Props) => {
  if (!category) return null;
  const color = CategoryColors(category.id);

  return (
    <>
      {nonLink ? (
        <Badge
          color={color}
          component={'div'}
          mb={bottomOffset ? 10 : 0}
          radius='lg'
          size={small ? 'sm' : 'md'}
          variant='dot'
        >
          {category.name}
        </Badge>
      ) : (
        <Badge
          color={color}
          component={Link}
          href={`/categories/${category.id}`}
          mb={bottomOffset ? 10 : 0}
          radius='lg'
          size={small ? 'sm' : 'md'}
          style={{
            cursor: 'pointer'
          }}
          variant='dot'
        >
          {category.name}
        </Badge>
      )}
    </>
  );
};
