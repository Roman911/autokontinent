'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react';
import { Link } from '@/i18n/routing';
import styles from './index.module.scss';
import Logo from '../../Logo';
import Search from './Search';
import ButtonBlock from './ButtonBlock';
import * as Icons from '@/components/UI/Icons';
import CarTireFilter from '../Menu/CarTireFilter';
import CarDiskFilter from '../Menu/CarDiskFilter';
import { links } from '@/components/Layout/Header/links';
import Contacts from '@/components/Layout/Header/Contacts';
import { SettingsProps } from '@/models/settings';

interface Props {
	settings: SettingsProps
}

const HeaderMain: FC<Props> = ({ settings }) => {
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	const [ filterIsOpen, setFilterOpen ] = useState<boolean | string>(false);
	const t = useTranslations('Main');

	const handleClick = (value: boolean | string) => {
		if(filterIsOpen !== value) {
			setFilterOpen(value);
		} else {
			setFilterOpen(false);
		}
	};

	const closeFilter = () => {
		setFilterOpen(false);
		setIsMenuOpen(false);
	}

	return (
		<Navbar
			maxWidth='2xl'
			isMenuOpen={ isMenuOpen }
			onMenuOpenChange={ setIsMenuOpen }
			className={ twMerge('bg-white border-b border-gray-200 relative', styles['header-center']) }
			classNames={ { toggleIcon: 'before:h-0.5 after:h-0.5', wrapper: twMerge('grid h-40 md:h-16 items-center justify-normal py-3 px-4 grid-cols-2 lg:grid-cols-[220px_420px_auto_150px] mx-auto max-w-7xl', styles['container']) } }
		>
			<NavbarContent className={ styles.logo }>
				<NavbarBrand>
					<Logo />
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden md:flex'>
				<Contacts isTopLine={ false } settings={ settings } />
			</NavbarContent>
			<NavbarContent className={ styles.search }>
				<Search />
			</NavbarContent>
			<NavbarContent justify='end'>
				<ButtonBlock />
				<NavbarMenuToggle className="sm:hidden" aria-label={ isMenuOpen ? "Close menu" : "Open menu" }/>
			</NavbarContent>
			<NavbarMenu className={ twMerge('mt-20 bg-white pt-6', styles.menu) }>
				<NavbarMenuItem>
					<button
						onClick={ () => handleClick('tires') }
						className={ twMerge('px-5 py-2 w-full flex items-center justify-between uppercase font-bold group transition hover:text-primary',
							filterIsOpen === 'tires' && 'text-primary') }
					>
						<span>{ t('cartires') }</span>
						<span className={ twMerge('transition', filterIsOpen === 'tires' && 'rotate-180') }>
						<Icons.ChevronDownIcon className='transition'/>
					</span>
					</button>
					{ filterIsOpen === 'tires' &&
						<div className='mt-4 grid grid-cols-2 gap-2'>
							<CarTireFilter onClick={ closeFilter } />
						</div>
					}
				</NavbarMenuItem>
				<NavbarMenuItem>
					<button
						onClick={ () => handleClick('disks') }
						className={ twMerge('px-5 py-2 w-full flex items-center justify-between uppercase font-bold group transition hover:text-primary',
							filterIsOpen === 'disks' && 'text-primary'
						) }>
						<span>{ t('cardiscs') }</span>
						<span className={ twMerge('transition', filterIsOpen === 'disks' && 'rotate-180') }>
						<Icons.ChevronDownIcon className='transition'/>
					</span>
					</button>
					{ filterIsOpen === 'disks' &&
						<div className='mt-5 grid grid-cols-2 gap-2'>
							<CarDiskFilter onClick={ closeFilter } />
						</div>
					}
				</NavbarMenuItem>
				{ links.map((item, index) => {
					return <NavbarMenuItem key={ index } onClick={ closeFilter }>
						<Link
							href={ item.url }
							className='py-2 px-5 block uppercase font-bold'
						>
							{ t(item.title) }
						</Link>
					</NavbarMenuItem>
				}) }
			</NavbarMenu>
		</Navbar>
	)
};

export default HeaderMain;
