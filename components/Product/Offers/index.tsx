import { FC, Dispatch, SetStateAction } from 'react';
import { Radio, RadioGroup } from '@heroui/react';
import CountryInfo from '@/components/UI/CountryInfo';
import { Language } from '@/models/language';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import * as Icons from '@/components/UI/Icons';
import type { Offers } from '@/models/product';

interface Props {
	locale: Language
	offerId: number
	offers: Offers[]
	setOfferId: Dispatch<SetStateAction<number>>
	setQuantity: Dispatch<SetStateAction<number>>
}

const Offers: FC<Props> = ({ locale, offerId, offers, setOfferId, setQuantity }) => {
	const handleChange = (value: string) => {
		setOfferId(+value);
		setQuantity(1);
	}

	return (
		<div className='offers mt-4 lg:mt-8 mb-5'>
			<RadioGroup color='primary' value={ `${ offerId }` } onValueChange={ handleChange } size='lg'>
				{ offers.map(item => {
					return <Radio color='primary' key={ item.offer_id } value={ `${item.offer_id}` } classNames={{
						control: 'h-3 w-3',
						labelWrapper: 'w-full'
					}}
												className='bg-white lg:bg-transparent border lg:border-0 rounded-full ml-0 mt-2 lg:mt-0 w-full max-w-full'
					>
						<div
							className='grid-cols-12 grid lg:grid-cols-10 w-full gap-1 items-center lg:min-w-[460px]'
						>
							<div className='font-medium col-span-2 lg:col-span-2 text-sm lg:ml-3 text-black'>
								{ item.quantity } шт.
							</div>
							<div className='country col-span-3 lg:col-span-3'>
								<CountryInfo
									country={ locale === Language.UK ? item.country : item.country_ru }
									countryCode={ countryCodeTransform(item.country) } year={ item.year }
									mobileHidden={ true }
									titleClassName=''
								/>
							</div>
							<div className='storage col-span-4 lg:col-span-3 text-sm text-gray-600 content-center flex items-center gap-x-1 lg:gap-x-2'>
								<Icons.MarkerIcon className='fill-gray-600 w-6' />
								{ locale === Language.UK ? item.posts.city : item.posts.city_ru }
							</div>
							<div className='price col-span-3 lg:col-span-2 font-bold content-center text-sm text-black'>
								{ +item.price } грн
							</div>
						</div>
					</Radio>
				}) }
			</RadioGroup>
		</div>
	)
};

export default Offers;
