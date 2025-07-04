import { Link } from '@/i18n/routing';
import { twMerge } from 'tailwind-merge';
import { Section } from '@/models/filter';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/hooks/redux';
import { reset } from '@/store/slices/filterIsOpenSlice';

const SwitchTabs = ({ section, car }: { section: Section, car: string | null }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const renderTab = (value: Section) => {
		const url = `/catalog/${ value }${ car ? `/${ car }` : '' }`;

		return (
			<Link
				onClick={ () => dispatch(reset()) }
				href={ url }
				className={ twMerge(
					'text-sm font-bold uppercase py-3.5 rounded-t-sm text-center text-black bg-white border border-gray-300',
					section !== value && 'bg-gray-100 text-gray-400'
				) }
			>
				{ t(value) }
			</Link>
		);
	};

	return (
		<div className='filter lg:h-auto w-[calc(100%-70px)] lg:w-full pt-4 lg:pt-0'>
			<div className='filter-tabs grid grid-cols-2 gap-2.5 -mb-0.5'>
				{ renderTab(Section.Tires) }
				{ renderTab(Section.Disks) }
			</div>
		</div>
	)
};

export default SwitchTabs;
