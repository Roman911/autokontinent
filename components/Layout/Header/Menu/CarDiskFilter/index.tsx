import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LinkComponent from '../LinkComponent';
import Title from '../Title';
import { brandsLinks, carBrandsLinks, diameterLinks, typeDiskLinks } from './links';

const CarDiskFilter = ({ onClick }: { onClick?: () => void }) => {
	const t = useTranslations('HeaderFilter');

	return <>
		<div>
			<Title title={ t('by disk type') }/>
			{ typeDiskLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					onClick={ onClick }
					href={ item.href }
					label={ t(item.label) }
					mt={ item.mt }
					border={ false }
				/>
			}) }
		</div>
		<div>
			<Title title={ t('by brands') }/>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{ brandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						onClick={ onClick }
						href={ item.href }
						label={ item.label }
						border={ false }
					/>
				}) }
			</div>
			<Link
				onClick={ onClick }
				href='/catalog/disks'
				className='text-gray-800 font-semibold uppercase underline hover:text-primary'
			>
				{ t('all brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by car brands') }/>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{ carBrandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						onClick={ onClick }
						href={ item.href }
						label={ item.label }
						border={ false }
					/>
				}) }
			</div>
			<Link
				onClick={ onClick }
				href='/catalog/disks'
				className='text-gray-800 font-semibold uppercase underline hover:text-primary'
			>
				{ t('all car brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<div>
				<Title title={ t('by diameter') }/>
				<div className='mt-6 mb-6 grid grid-cols-3 md:grid-cols-4 gap-1.5 max-w-64 pr-2.5'>
					{ diameterLinks.map(item => {
						return <LinkComponent
							key={ item.label }
							onClick={ onClick }
							href={ item.href }
							border={ item.border }
							label={ item.label }
						/>
					}) }
				</div>
			</div>
		</div>
	</>
};

export default CarDiskFilter;
