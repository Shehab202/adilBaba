type ProductStatusType = "active" | "inactive";
export interface CategoriesType {
  slug: string;
  featured: number;
  active: number;
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}
