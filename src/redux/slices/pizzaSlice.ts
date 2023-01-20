import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


 
type PizzaItem = {
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

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}


export type SearchPizzasParams = {
  category : string;
  search : string;
  sortBy : string;
  order : string;
  currentPage : string;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
}
export const fetchPizzas = createAsyncThunk<PizzaItem[],SearchPizzasParams>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {category, search, sortBy, order, currentPage} = params;
    const {data} = await axios.
    get<PizzaItem[]>(`https://63287ed29a053ff9aab95e51.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data;
  }
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,  
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>){
      state.items = action.payload;
    },
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchPizzas.pending,(state,action)=>{
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled,(state,action)=>{
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  /* extraReducers: {
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
  } */
})

export const selectPizzaData = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer