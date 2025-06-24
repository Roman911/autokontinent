import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ProductsProps } from '@/models/products';

export interface ProductsState {
	isFetching: boolean,
	isLoading: boolean,
	products: ProductsProps | null,
}

const initialState: ProductsState = {
	isFetching: false,
	isLoading: false,
	products: null,
}

export const productsSlice = createSlice({
	name: 'productsSlice',
	initialState,
	reducers: {
		setProducts: (state, actions: PayloadAction<ProductsProps>) => {
			state.products = actions.payload;
		},
		reset: () => initialState,
	},
});

export const { setProducts, reset } = productsSlice.actions

export default productsSlice.reducer
