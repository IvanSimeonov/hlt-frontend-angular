import { FoodDTO } from './foodDTO';


export interface FoodPageDTO { 
    foods?: Array<FoodDTO>;
    pageNumber?: number;
    totalPages?: number;
    totalFoods?: number;
}