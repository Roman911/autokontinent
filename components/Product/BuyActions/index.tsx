import { FC } from 'react';
import Button from '@/components/UI/Button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import QuickOrder from '@/components/Product/QuickOrder';
import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import { useTranslations } from 'next-intl';
import { useAppGetProducts } from '@/hooks/getProducts';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { removeCart, setQuantity } from '@/store/slices/cartSlice';
import CartComponent from '@/components/Cart';
import NoResult from '@/components/UI/NoResult';
import Spinner from '@/components/UI/Spinner';

interface Props {
	offerId: number
	quantity: number
	section: Section
	data: ProductProps
	onSubmit: () => void
}

const BuyActions: FC<Props> = ({ offerId, quantity, section, data, onSubmit }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const t = useTranslations('Main');
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const { tires, cargo, disks, battery, isLoading } = useAppGetProducts(cartItems, 'reducerCart', true);
	const dataTotal = {
		result: true,
		data: {
			total_count: 5,
			products: [ ...tires, ...cargo, ...disks, ...battery ]
		}
	};

	const removeProduct = (id: number) => {
		removeFromStorage('reducerCart', id);
		dispatch(removeCart(id));
	};

	const onSetQuantity = (id: number, quantity: number) => {
		const storage = getFromStorage('reducerCart');
		const item = storage.find((i: { id: number, section: string, quantity: number }) => i.id === id);
		addToStorage('reducerCart', [ ...storage.filter((i: { id: number }) => i.id !== id), { ...item, quantity } ]);
		dispatch(setQuantity({ ...item, quantity }));
	}

	const handleClickBuy = () => {
		onSubmit();
		onOpen();
	}

	return (
		<div className='relative buttons-buy flex flex-col items-end gap-2'>
			{ cartItems.find(item => +item.id === offerId) ?
				<Button color='success' onPress={ onOpen } className='w-full font-bold lg:w-72'>
					{ t('in cart') }
				</Button> :
				<Button color='secondary' onPress={ handleClickBuy } className='w-full font-bold lg:w-72 text-black'>
					{ t('buy') }
				</Button>
			}
			<QuickOrder
				offerId={ offerId }
				quantity={ quantity }
				section={ section }
				offerItem={ data?.data?.offers?.find(item => item.offer_id === +offerId) }
			/>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } size='4xl' placement='top'>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader>{ t('cart') }</ModalHeader>
							<ModalBody>
								<Spinner height='h-40' show={ isLoading }>
									{ cartItems.length > 0 && dataTotal?.result ? <CartComponent
											data={ dataTotal }
											cartItems={ cartItems }
											removeProduct={ removeProduct }
											setQuantity={ onSetQuantity }
										/> :
										<NoResult noResultText='no product to cart'/> }
								</Spinner>
							</ModalBody>
						</>
					) }
				</ModalContent>
			</Modal>
		</div>
	)
};

export default BuyActions;
