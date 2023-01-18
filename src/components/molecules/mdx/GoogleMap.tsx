import { AspectRatio, Container } from '@mantine/core';
import React, { FC } from 'react';

type Props = {
  src: string;
};

<iframe
  allowfullscreen=''
  height='450'
  loading='lazy'
  referrerPolicy='no-referrer-when-downgrade'
  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966560.203879753!2d142.57585195000001!3d43.43905915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f9f59209f6c888b%3A0x1c3cc3564fce038f!2z5YyX5rW36YGT!5e0!3m2!1sja!2sjp!4v1674062503357!5m2!1sja!2sjp'
  style='border:0;'
  width='600'
></iframe>;

export const GoogleMap: FC<Props> = ({ src, ...props }: Props) => {
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
