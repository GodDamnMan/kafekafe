import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  picture: z.string().optional(),
});

export const SectionSchema = z.object({
  title: z.string(),
  items: z.array(ItemSchema),
});

export const MenuSchema = z.array(SectionSchema);

export type Item = z.infer<typeof ItemSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Menu = z.infer<typeof MenuSchema>;

export function fetchMenu(): Promise<Menu> {
  return fetch('/api/menu')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch menu');
      }
      return res.json();
    })
    .then((data) => MenuSchema.parse(data));
}
