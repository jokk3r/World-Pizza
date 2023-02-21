import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortOrderEnum, SortPropertyEnum } from './types'




const initialState:FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  pageCount: 3,
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
      if(action.payload === 0){
        state.pageCount = 3
      }else{
        state.pageCount = 1;
        state.currentPage = 1;
      }
      console.log(state.pageCount)
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
      if(action.payload.currentPage === 0){
        state.pageCount = 3
      }else{
        state.pageCount = 1;
        state.currentPage = 1;
      }
    } else {
      state.currentPage = 1;
      state.categoryId = 0;
      state.pageCount = 3;
      state.sort = {
        name: "popularity(DESC)",
        sortProperty: SortPropertyEnum.RATING,
        sortOrder:SortOrderEnum.DESC
      };
    }
    }
  },
})



export const { setCategoryId, setSort,setCurrentPage,setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer