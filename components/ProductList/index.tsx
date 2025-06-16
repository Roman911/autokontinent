import { FC } from 'react';
import ProductCard from './Card';
import type { Data } from '@/models/products';
import { twMerge } from 'tailwind-merge';

interface Props {
	classnames?: string
	data: Data
}

const ProductList: FC<Props> = ({ classnames, data }) => {
	const products = data.products.map(item => {
		return <ProductCard key={ item.group } item={ item } />
	})

	return (
		<div className={ twMerge('grid -mx-5 md:mx-0', classnames) }>
			{ products }
		</div>
	)
};

export default ProductList;
