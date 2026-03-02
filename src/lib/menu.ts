import { readFileSync } from 'fs';
import { join } from 'path';

export type Option = { name: string; displayName: string; info: string | null };
export type CustomizationGroup = {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  options: Option[];
};
export type MenuItem = { name: string; url: string; customizationGroups: CustomizationGroup[] };
export type RawCategory = { category: string; items: MenuItem[] };

export function loadCategories(): RawCategory[] {
  const raw = JSON.parse(
    readFileSync(join(process.cwd(), 'public/html/categories-full.json'), 'utf-8')
  ) as RawCategory[];

  return raw.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({
      ...item,
      customizationGroups: item.customizationGroups ?? [],
    })),
  }));
}

export function visibleOptions(options: Option[]): Option[] {
  return options.filter((o) => o.name !== 'quantity');
}
