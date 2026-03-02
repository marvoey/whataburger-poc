import type { Category } from './Category';

export type MenuPage = {
  /** Page heading — e.g. "Menu" */
  Title: string;
  /** Ordered list of category cards displayed in the grid */
  Categories: Category[];
};
