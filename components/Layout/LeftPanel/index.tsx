'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import * as Icons from './Icons';
import { menuItems } from './menuItems';
import { twMerge } from 'tailwind-merge';

const iconMap = {
	akb: Icons.AkbIcon,
	brands: Icons.BrandsIcon,
	calculator: Icons.CalculatorIcon,
	disk: Icons.DiskIcon,
	tire: Icons.TireIcon,
} as const;

const baseLinkClasses =
	'flex flex-col items-center justify-center gap-2.5 p-3.5 text-white text-center font-medium border-r-3 border-transparent duration-150 ease-in-out hover:bg-blue-800 hover:border-primary';

const LeftPanel = () => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const pathname = usePathname();

	return (
		<div className='hidden xl:block fixed top-0 left-0 h-full bg-blue-400 z-40 w-32'>
			<div className='mt-52'>
				{ menuItems.map(({ href, icon, title }, index) => {
					const Icon = iconMap[icon];
					const isActive = pathname.startsWith(href);
					const linkClass = twMerge(baseLinkClasses, isActive && 'bg-blue-800 border-primary');

					return (
						<Link
							key={ index }
							href={ href }
							onClick={ () => dispatch(setProgress(true)) }
							className={ linkClass }
						>
							<Icon/>
							{ t(title) }
						</Link>
					);
				}) }
			</div>
		</div>
	);
};

export default LeftPanel;
