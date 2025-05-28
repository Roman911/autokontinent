import { FC } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@heroui/react';
import { addToast } from '@heroui/toast';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBookmarks, removeBookmarks } from '@/store/slices/bookmarksSlice';
import { setProgress } from '@/store/slices/progressSlice';
import * as Icons from '@/components/UI/Icons';
import { updateStorage } from './helper';

interface Props {
	id: number
	section: string
	isProduct?: boolean
}

const AddToDefense: FC<Props> = ({ id, section, isProduct }) => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const t = useTranslations('AddButton');
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const isBookmarks = bookmarksItems.some(item => item.id === id);

	const handleClick = () => {
		if(pathname !== '/bookmarks') dispatch(setProgress(true));
		router.push('/bookmarks');
	}

	// Toggle bookmarks
	const handleClickBookmarks = () => {
		addToast({
			description: t( isBookmarks ? 'product removed from wishlist' : 'product added to wishlist'),
			classNames: { base: 'text-black', title: 'text-black' },
			endContent: !isBookmarks && (
				<Button onPress={ handleClick } color='primary' size='sm' variant='bordered'>
					{ t('wishlist') }
				</Button>
			),
		});
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks({ id, section }));
		updateStorage('reducerBookmarks', id, section, isBookmarks);
	};

	return (
		<Button
			onPress={ handleClickBookmarks }
			isIconOnly
			aria-label='Defense'
			radius='full'
			variant={ isProduct ? 'flat' : 'light' }
			className={ twMerge('text-gray-400 hover:text-primary', isBookmarks && 'text-primary', isProduct && 'bg-gray-200 w-12 h-12 p-3') }
		>
			<Icons.HeartIcon
				className={ twMerge( isBookmarks && 'fill-primary text-primary') }/>
		</Button>
	)
};

export default AddToDefense;
