import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort:{
    name:"popularity(DESC)",
    sortProperty:"rating",
    sortOrder:"desc"
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,  
  reducers: {
    setCategoryId(state, action){
      console.log("action setCategory", action)
      state.categoryId = action.payload
    },
    setSearchValue(state, action){
      state.searchValue = action.payload
    },
    setSort(state,action){
      console.log(action)
      state.sort = action.payload
    },
    setCurrentPage(state,action){
      console.log(action)
      state.currentPage = action.payload
    },
    setFilters(state,action){
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  },
})

export const selectSort = state => state.filter.sort;
export const selectFilter = state => state.filter;

export const { setCategoryId, setSort,setCurrentPage,setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer