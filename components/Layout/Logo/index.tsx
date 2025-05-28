'use client';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

const width = 278;
const height = 32;

const Logo = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') {
			dispatch(setProgress(true));
		}
	};

	const commonProps = {
		href: '/',
		onClick: handleClick,
		className: 'logo',
	};

	return (
		<Link { ...commonProps }>
			<Image
				src='/logo.svg'
				alt='logo'
				width={ width }
				height={ height }
				priority
			/>
		</Link>
	);
};

export default Logo;
