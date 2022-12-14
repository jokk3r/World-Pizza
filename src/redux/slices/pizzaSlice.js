import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params, thunkApi) => {
    const {category, search, sort, currentPage} = params;
    const {data} = await axios.
    get(`https://63287ed29a053ff9aab95e51.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${sort.sortOrder}${search}`);

    return data
  }
)


const initialState = {
  items: [],
  status: 'loading', //loading | success | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,  
  reducers: {
    setItems(state, action){
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state,action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  }
})

export const selectPizzaData = (state) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer