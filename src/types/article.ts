import { Category } from '@/types/category';
import { Image } from '@/types/image';

export type Article = {
  id: string;
  category: Category;
  eyecatch: EyeCatch;
  summary?: string;
  title: string;
  content: string; // markdown content
  publishedAt: string;
  updatedAt: string;
  revisedAt: string;
};

export type EyeCatch = Omit<Image, 'alt' | 'type'>;
