import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum{
  RATING = "rating",
/*   RATING_ASC = "-rating", */
  TITLE = "title",
/*   TITLE_ASC = "-title", */
  PRICE = "price",
 /*  PRICE_ASC = "-price", */
}

export enum SortOrderEnum{
  DESC = "desc",
  ASC = "asc"
}

export type Sort ={
  name: string;
  sortProperty: SortPropertyEnum;
  sortOrder: SortOrderEnum;
}

interface FilterSliceState{
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}


const initialState:FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort:{
    name:"popularity(DESC)",
    sortProperty:SortPropertyEnum.PRICE,
    sortOrder:SortOrderEnum.DESC
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,  
  reducers: {
    setCategoryId(state, action:PayloadAction<number>){
      console.log("action setCategory", action)
      state.categoryId = action.payload
    },
    setSearchValue(state, action:PayloadAction<string>){
      state.searchValue = action.payload
    },
    setSort(state,action:PayloadAction<Sort>){
      console.log(action)
      state.sort = action.payload
    },
    setCurrentPage(state,action:PayloadAction<number>){
      console.log(action)
      state.currentPage = action.payload
    },
    setFilters(state,action:PayloadAction<FilterSliceState>){
      if (Object.keys(action.payload).length) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    } else {
      state.currentPage = 1;
      state.categoryId = 0;
      state.sort = {
        name: "popularity(DESC)",
        sortProperty: SortPropertyEnum.RATING,
        sortOrder:SortOrderEnum.DESC
      };
    }
    }
  },
})

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort,setCurrentPage,setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer