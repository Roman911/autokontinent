'use client';
import { FC } from 'react';
import FilterActive from '@/components/Catalog/FilterActive';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import { Section } from '@/models/filter';
import { Language } from '@/models/language';
import type { Data } from '@/models/products';

interface Props {
	section: Section
	slug?: string[]
	locale: Language
	result: boolean | undefined
	data: Data | undefined
	isCatalog?: boolean
	isLoading?: boolean
	isFetching?: boolean
}

const CatalogContent: FC<Props> = ({ section, slug, locale, data, result, isCatalog, isFetching, isLoading }) => {
  return (
		<>
			<div className='flex justify-end mb-2'>
				{ isCatalog && <FilterActive section={ section } locale={ locale } className='hidden lg:flex' slug={ slug } /> }
			</div>
			{ !result && !isLoading && !isFetching && !data && <NoResult noResultText='no result' /> }
			{ (result && data) && <ProductList
				classnames={ `grid-cols-2 lg:grid-cols-${ isCatalog ? 3 : 4 }` }
				data={ data }
			/> }
		</>
	);
};

export default CatalogContent;
