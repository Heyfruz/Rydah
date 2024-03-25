import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { products } from 'data';
import { generateRandomHexadecimal } from 'utils';

const initialState: ProductState = {
  product: products,
};

const { actions, reducer } = createSlice({
  initialState,
  name: 'product',
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      console.log('🚀 ~ action:', action.payload);

      state.product = [
        { ...action.payload, id: generateRandomHexadecimal(15) },
        ...state.product,
      ];
    },
  },
});

export const { addProduct } = actions;

export default reducer;
