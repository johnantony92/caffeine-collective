import { Database } from "database.types";

export type ProductTag = 'beginner-friendly' | 'seriously-black' | 'light-roast' | 'medium-roast' | 'dark-roast' | 'single-origin' | 'blend';
export type CoffeeProfile = Database['dbo']['Tables']['coffeeprofile']['Row'];
export type BrandSnippet = Pick<Database['dbo']['Tables']['brand']['Row'], 'name'>;
export type ProductBase = Database['dbo']['Tables']['products']['Row'];
export type BrewMethod = Database['dbo']['Tables']['preferredbrewmethod']['Row'];
export type ProductRating = Database['dbo']['Tables']['productratings']['Row']; 

export type ProductWithDetails = ProductBase & {
  brand: BrandSnippet | null;
  coffeeprofile: CoffeeProfile | null;
};

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  imageurl: string;
  averagerating: number;
  profile:string
  brandid:number;
  brandname:string;
  tags?: ProductTag[];
  price: number;
  description?: string;
  reviews?: ProductReview[];
  preferredRecipe?:PrefferedRecipe;
  productTypeId?:number;

}

export interface PrefferedRecipe {
  grindSize: string;
  waterTemperature: string;
  coffeeToWaterRatio: string;
  brewTime: string;
  instructions: string[];
}

export enum ProductType {
  Coffee = "Coffee",
  Acessories = "Acessories"
}

export interface ProductTypeInfo {
  id: number;
  name: string;
  image: string;
}

export const productTypes: ProductTypeInfo[] = [
  { id: 1, name: ProductType.Coffee, image: "/images/roasted-coffee-beans.jpeg" },
  { id: 2, name: ProductType.Acessories, image: "/images/coffee-accessories.jpg" },
];

export interface Brand{
  id: number;
  name: string;
}

export type ProductPageData = {
  product: ProductBase & {
    brand: BrandSnippet | null;
    coffeeprofile: CoffeeProfile | null;
  };
  brewMethods: BrewMethod[];
  ratings: ProductRating[];
};