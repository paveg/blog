export type Category = {
  id: Categories;
  name: string;
  publishedAt: string;
  updatedAt: string;
  revisedAt: string;
};

export type Categories = 'technology' | 'gadget' | 'travel' | 'updates' | 'cars-and-motorcycles';
