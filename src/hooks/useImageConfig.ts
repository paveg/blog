import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context';
import { useContext } from 'react';

export const useImageConfig = () => useContext(ImageConfigContext);
