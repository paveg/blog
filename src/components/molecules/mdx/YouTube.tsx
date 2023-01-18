import { AspectRatio, AspectRatioProps, Text, useMantineColorScheme } from '@mantine/core';
import React, { FC } from 'react';

type Props = {
  id: string;
  children: React.ReactElement;
} & Omit<AspectRatioProps, 'children'>;

export const YouTube: FC<Props> = ({ id, children }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const embedUrl = 'https://www.youtube.com/embed';
  const src = `${embedUrl}/${id}`;
  return (
    <>
      <AspectRatio id={id} m={10} ratio={16 / 9}>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          frameBorder={0}
          src={src}
          title='YouTube video player'
        />
      </AspectRatio>
      {children && (
        <Text align='center' color={colorScheme == 'light' ? 'gray.7' : 'gray.4'} inline italic>
          {children}
        </Text>
      )}
    </>
  );
};
