import { Category } from './category';

export type Article = {
  id: string;
  category: Category;
  eyecatch: EyeCatch;
  title: string;
  content: string; // markdown content
  publishedAt: string;
  updatedAt: string;
  revisedAt: string;
};

type EyeCatch = {
  url: string;
  height: number;
  width: number;
};
