export type ProductTag = 'beginner-friendly' | 'seriously-black' | 'light-roast' | 'medium-roast' | 'dark-roast' | 'single-origin' | 'blend';

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
  { id: 1, name: ProductType.Coffee, image: "/images/roasted-coffee-beans.jpg" },
  { id: 2, name: ProductType.Acessories, image: "/images/coffee-accessories.jpg" },
];

export interface Brand{
  name:string;
}