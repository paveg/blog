import { Badge, MantineColor, Text } from '@mantine/core';
import React, { FC } from 'react';
import { Category, Categories } from '@/types/category';

type Props = {
  category?: Category;
  small?: boolean;
};

const CategoryColors = (categoryId: Categories): MantineColor => {
  switch (categoryId) {
    case 'gadget':
      return 'green';
    case 'travel':
      return 'orange';
    case 'technology':
      return 'gray';
    case 'updates':
      return 'pink';
    case 'cars-and-motorcycles':
      return 'cyan';
    default:
      return 'blue';
  }
};

export const CategoryBadge: FC<Props> = ({ category }: Props) => {
  if (!category) return null;
  const color = CategoryColors(category.id);

  return (
    <>
      <Badge color={color} mb={10} radius='lg' variant='dot'>
        <Text color='gray' size='xs' weight={100}>
          {category.name}
        </Text>
      </Badge>
    </>
  );
};
