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
  imageUrl: string;
  rating: number;
  tags: ProductTag[];
  price: number;
  description: string;
  reviews: ProductReview[];
  preferredRecipe?:PrefferedRecipe;
}

export interface PrefferedRecipe {
  grindSize: string;
  waterTemperature: string;
  coffeeToWaterRatio: string;
  brewTime: string;
  instructions: string[];
}