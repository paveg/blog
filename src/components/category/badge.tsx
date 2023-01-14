import { Badge, MantineColor, Text, useMantineColorScheme } from '@mantine/core';
import React, { FC } from 'react';
import { Category, Categories } from '@/types/category';

type Props = {
  category?: Category;
  small?: boolean;
  bottomOffset?: boolean;
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

export const CategoryBadge: FC<Props> = ({ small, category, bottomOffset }: Props) => {
  const { colorScheme } = useMantineColorScheme();

  if (!category) return null;
  const color = CategoryColors(category.id);

  return (
    <>
      <Badge
        color={color}
        mb={bottomOffset ? 10 : 0}
        radius='lg'
        size={small ? 'sm' : 'md'}
        variant='dot'
      >
        <Text color={colorScheme == 'light' ? 'gray.7' : 'gray.4'} size='xs' weight={100}>
          {category.name}
        </Text>
      </Badge>
    </>
  );
};
