import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, SearchPizzasParams } from "./types";



export const fetchPizzas = createAsyncThunk<PizzaItem[],SearchPizzasParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
      const {category, search, sortBy, order, currentPage} = params;
      const {data} = await axios.
      get<PizzaItem[]>(`https://63287ed29a053ff9aab95e51.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);
      return data;
    }
  )