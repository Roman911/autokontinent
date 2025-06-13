'use client';
import { twMerge } from 'tailwind-merge';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Language } from '@/models/language';

const params = [
	{ title: 'UA', language: Language.UK },
	{ title: 'RU', language: Language.RU },
];

const LanguageChanger = () => {
	const pathname = usePathname();
	const locale = useLocale();

	return (
		<div className='divide-x divide-white/40 font-semibold text-sm 2xl:text-base ml-auto md:ml-0'>
			{ params.map((item, index) => {
				return <Link
					locale={ item.language }
					key={ index }
					href={ pathname }
					className={
						twMerge(
							'leading-8 text-white/40 active:text-white hover:text-white',
							locale === item.language && 'text-white pointer-events-none',
							index === 0 && 'pr-1.5 2xl:pr-2',
							index === 1 && 'pl-1.5 2xl:pl-2'
						)
					}>
					{ item.title }
				</Link>
			}) }
		</div>
	)
};

export default LanguageChanger;
