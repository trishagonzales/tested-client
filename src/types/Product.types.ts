import { User } from './User.types';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images?: string[];
  thumbnail?: string;
  datePosted?: Date;
  rating?: number;
  reviews?: ReviewType[];
}

export interface ReviewType {
  id: string;
  rating: RatingType | number;
  comment?: string;
  author: ReviewAuthor;
  datePosted: Date;
}

export interface ReviewAuthor {
  id: string;
  username: string;
  avatar?: string;
}

export type RatingType = 1 | 2 | 3 | 4 | 5;

export interface UpdateCartItemInput {
  id: string;
  quantity: number;
  isIncluded: boolean;
}
