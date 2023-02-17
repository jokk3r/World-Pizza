
export type PizzaItem = {
    id: string;
    title:string;
    price:number;
    imageUrl:string;
    types:number[];
    sizes:number[];
    rating:number;
}
  
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed', 
    ERROR = 'error',
}
  
export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}
  
  
export type SearchPizzasParams = {
    category : string;
    search : string;
    sortBy : string;
    order : string;
    currentPage : string;
    pageCount:string;
}
  