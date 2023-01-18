import { AspectRatio, Container } from '@mantine/core';
import React, { FC } from 'react';

type Props = {
  src: string;
};

export const GoogleMap: FC<Props> = ({ src }: Props) => {
  return (
    <Container mb={15} mt={15} size='sm'>
      <AspectRatio ratio={16 / 9}>
        <iframe
          frameBorder={0}
          height='100%'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          src={src}
          title='Google Map'
          width='100%'
        />
      </AspectRatio>
    </Container>
  );
};
