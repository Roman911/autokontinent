import { FC } from 'react';
import Image from 'next/image';
import { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';

interface Props extends LinkProps {
	img?: string
	label: string
	mt?: string
	border: boolean
	onClick?: () => void
}

const LinkComponent: FC<Props> = ({ href, img, label, mt, border, onClick }) => {
	return <Link
		onClick={ onClick }
		href={ href }
		className={ twMerge('flex items-center gap-2.5 group/item hover:text-primary', mt,
			border &&
			'w-12 lg:w-14 h-10 text-sm lg:text-base justify-center font-medium border border-gray-700 rounded-sm hover:border-primary hover:bg-blue-100 '
			+ 'transition'
		)}
	>
		{ img && <Image
			src={ `/icons/${img}.svg` }
			alt={ `${img} logo` }
			width={ 24 }
			height={ 24 }
		/> }
		<span className={ twMerge(!border && 'transition group-hover/item:underline') }>
			{ label }
		</span>
	</Link>
};

export default LinkComponent;
