'use client';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const ShowAll = ({ href }: { href: string }) => {
	const t = useTranslations('Main');

	return (
		<div className='mt-8 text-center'>
			<Link
				href={ href }
				className='text-primary font-bold underline uppercase'
			>
				{ t('show all') }
			</Link>
		</div>
	)
};

export default ShowAll;
