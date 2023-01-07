import { ImageConfigComplete, imageConfigDefault } from 'next/dist/shared/lib/image-config';
import Head from 'next/head';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import React, { DetailedHTMLProps, SourceHTMLAttributes, useMemo, FC } from 'react';
import { useImageConfig } from '@/hooks/useImageConfig';

type ArtDirective = {
  src: string;
  media: string;
  width?: number;
  height?: number;
};

const AVIF = 'image/avif';
const WEBP = 'image/webp';
const FORMATS = [AVIF, WEBP];

type GetSourcesArgs = {
  deviceSizes: number[];
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  formats?: string[];
  artDirevtives?: ArtDirective[];
  preloadFormat: typeof WEBP | typeof AVIF;
};
type GetSourcesResult = {
  sources: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>[];
  preloadLinks: { srcSet: string; type: string; media?: string }[];
};
export const getSources = ({
  deviceSizes,
  src,
  width,
  height,
  quality = 75,
  formats = FORMATS,
  artDirevtives,
  preloadFormat
}: GetSourcesArgs): GetSourcesResult => {
  const getFotmatParam = (format: string): string => format.replace(/^image\//, '');
  const getSrcSet = (src: string, format?: string): string =>
    deviceSizes
      .map(
        (deviceSize) =>
          `${loader({
            src,
            width: deviceSize,
            quality,
            format: format !== undefined ? getFotmatParam(format) : undefined
          })} ${deviceSize}w`
      )
      .join(', ');

  if (artDirevtives !== undefined) {
    if (!Array.isArray(artDirevtives)) {
      throw Error('Please specify Array to `artDirevtives`');
    }

    const artDirectivesSources = artDirevtives.map(({ src, media, width, height }) => [
      ...formats.map((format) => ({
        srcSet: getSrcSet(src, format),
        type: format,
        media,
        width,
        height
      })),
      { srcSet: getSrcSet(src), media, width, height }
    ]);
    const defaultSources = formats.map((format) => ({
      srcSet: getSrcSet(src, format),
      type: format,
      width,
      height
    }));

    const artDirectivesPreloadLinks = artDirevtives.map(({ src, media }) => ({
      srcSet: getSrcSet(src, getFotmatParam(preloadFormat)),
      type: preloadFormat,
      media
    }));
    const defaultPreloadLink = {
      srcSet: getSrcSet(src, getFotmatParam(preloadFormat)),
      type: preloadFormat,
      media: 'not all and ' + artDirectivesPreloadLinks.at(-1)?.media
    };

    return {
      sources: [...artDirectivesSources, ...defaultSources].flat(),
      preloadLinks: [...artDirectivesPreloadLinks, defaultPreloadLink]
    };
  }

  return {
    sources: formats.map((format) => ({
      srcSet: getSrcSet(src, format),
      type: format
    })),
    preloadLinks: [
      {
        srcSet: getSrcSet(src, getFotmatParam(preloadFormat)),
        type: preloadFormat
      }
    ]
  };
};

const normalizeSrc = (src: string): string => {
  return src[0] === '/' ? src.slice(1) : src;
};

const loader = ({ src, width, quality, format }: ImageLoaderProps & { format?: string }) => {
  const url = new URL(normalizeSrc(src));
  const params = url.searchParams;

  params.set('fit', params.get('fit') || 'max');
  params.set('w', params.get('w') || width.toString());

  if (quality) {
    params.set('q', quality.toString());
  }

  if (format) {
    params.set('fm', format);
  }

  return url.href;
};

type SourcesProps = GetSourcesResult & Pick<ImageProps, 'sizes' | 'priority'>;

export const Sources = ({ sources, sizes = '100vw', priority, preloadLinks }: SourcesProps) => {
  return (
    <>
      {sources.map((sourceProps) => (
        <source
          {...(process.env.NODE_ENV === 'test' ? { 'data-testid': 'source' } : {})}
          key={sourceProps.srcSet}
          {...sourceProps}
        />
      ))}

      {priority &&
        preloadLinks.map(({ srcSet, type, media }) => (
          <Head key={srcSet}>
            <link
              {...(process.env.NODE_ENV === 'test' ? { 'data-testid': 'link' } : {})}
              as='image'
              imageSizes={sizes}
              imageSrcSet={srcSet}
              key={'__nimg-' + srcSet + media + sizes}
              media={media}
              rel='preload'
              type={type}
            />
          </Head>
        ))}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configEnv = process.env.__NEXT_IMAGE_OPTS as any as ImageConfigComplete;

type Props = Omit<ImageProps, 'src' | 'width' | 'height' | 'blurDataURL' | 'loader' | 'alt'> & {
  src: string;
  width: number;
  height: number;
  alt: string;
  artDirevtives?: ArtDirective[];
  preloadFormat?: typeof WEBP | typeof AVIF;
};

export const MicroCMSPicture: FC<Props> = ({
  src,
  width,
  height,
  quality,
  alt,
  priority,
  artDirevtives,
  preloadFormat = 'image/webp',
  ...props
}: Props) => {
  const configContext = useImageConfig();
  const deviceSizes = useMemo(() => {
    const c = configEnv || configContext || imageConfigDefault;
    const deviceSizes = c.deviceSizes.sort((a, b) => a - b);
    return deviceSizes;
  }, [configContext]);

  const sources = getSources({
    src,
    width,
    height,
    quality: Number(quality),
    deviceSizes,
    artDirevtives,
    preloadFormat
  });

  return (
    <picture>
      <Sources {...sources} priority={priority} sizes={props.sizes} />
      <Image
        {...props}
        {...{ src, width, height, quality, loader, alt }}
        blurDataURL={
          props.placeholder === 'blur' ? loader({ src, width: 8, quality: 10 }) : undefined
        }
        loading={priority ? 'eager' : props.loading}
        sizes={props.sizes ?? '100vw'}
      />
    </picture>
  );
};
