import Image from 'next/image';
import React, { FC } from 'react';

type Props = {
  height?: number;
  width?: number;
  src: string;
  alt?: string;
};

export const CustomImage: FC<Props> = (props: Props) => {
  const { alt, height, width, src } = props;

  const microCMSLoader = ({ src, width }: { src: string; width?: number }) => {
    return `${src}?auto=format&fit=max&w=${width}`;
  };

  return (
    <figure style={{ position: 'relative', height: 'clamp(150px,26vw,200px)' }}>
      <Image alt={alt || ''} height={height} loader={microCMSLoader} src={src} width={width} />
    </figure>
  );
};
