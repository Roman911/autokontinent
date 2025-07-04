'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { changeSubsection } from '@/store/slices/filterSlice';
import CarTireFilter from './CarTireFilter';
import CarDiskFilter from './CarDiskFilter';
import * as Icons from '@/components/UI/Icons';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { links } from '../links';
import { Section } from '@/models/section';
import { Subsection } from '@/models/filter';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const [reset, setReset] = useState(false);
	const t = useTranslations('Main');

	const handleClick = () => {
		setReset(true);
		setTimeout(() => {
			setReset(false);
		}, 100)
	}

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<div className='group'>
			<Button
				variant='light'
				size='lg'
				radius='none'
				className='font-semibold h-12 hover:!bg-white hover:text-primary'
				endContent={ <Icons.ChevronDownIcon
					width='14'
					height='14'
					strokeWidth='2'
					className='transition group-hover:rotate-180'
				/> }>
				{ label }
			</Button>
			<div
				className={ twMerge('absolute container left-1/2 top-12 z-30 w-full -translate-x-1/2 px-4 hidden group group-hover:flex', reset && 'hidden') }>
				<div className='w-full flex-auto overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5'>
					<div className='py-8 px-12 grid grid-cols-4'>
						{ sectionItem === Section.Tires ? <CarTireFilter onClick={ handleClick } /> : <CarDiskFilter onClick={ handleClick } /> }
					</div>
					<Button as={ Link } href={ `/catalog/${sectionItem}` } radius='none' className='w-full font-semibold'>
						{ t(`all ${ sectionItem }`) }
					</Button>
				</div>
			</div>
		</div>
	)

	return (
		<div className='bg-gray-100 hidden lg:block relative shadow-sm'>
			<nav className='container mx-auto max-w-7xl flex justify-between items-center gap-8 px-5'>
				{[{ section: 'tires', label: t('cartires') }, { section: 'disks', label: t('cardiscs') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ links.map((item, index) => {
					return <Link key={ index } onClick={ () => item.url === '/catalog/tires' ? dispatch(changeSubsection(Subsection.ByCars)) : '' } href={ item.url } className='font-semibold hover:bg-white hover:text-primary h-12 px-6 flex items-center'>
						{ t(item.title) }
					</Link>
				}) }
				<Dropdown radius='sm'>
					<DropdownTrigger>
						<Button
							variant='light'
							size='lg'
							radius='none'
							className='font-semibold h-12 w-40 hover:!bg-white hover:text-primary'
							endContent={ <Icons.ChevronDownIcon
								width='14'
								height='14'
								strokeWidth='2'
								className='transition'
							/> }
						>
							{ t('brands') }
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Brands">
						<DropdownItem as={ Link } href='/catalog-map/tyre' key='tyres'>{ t('tires') }</DropdownItem>
						<DropdownItem as={ Link } href='/catalog-map/disc' key='disks'>{ t('disks') }</DropdownItem>
						<DropdownItem as={ Link } href='/catalog-map/akum' key='battery'>{ t('battery') }</DropdownItem>
						<DropdownItem as={ Link } href='/catalog-map/car' key='cars'>{ t('cars') }</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</nav>
		</div>
	)
};

export default Navbar;
