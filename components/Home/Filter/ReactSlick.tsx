import Image from 'next/image';
import Slider from 'react-slick';
import './index.scss';

const items = [
	{
		thumbnail: 'slide-1.jpg',
	},
	{
		thumbnail: 'slide-2.jpg',
	},
	{
		thumbnail: 'slide-3.jpg',
	}
]

export const ReactSlick = () => {
	const settings = {
		arrows: false,
		dots: true,
		dotsClass: 'slick-dots slick-thumb',
		infinite: true,
		speed: 1000,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 6000,
	};

	return (
		<div className='slider-container w-full'>
			<Slider { ...settings }>
				{ items.map((item, i) => (
					<div
						key={ i }
						className='cursor-pointer'
					>
						<Image src={ `/images/home-filter/${item.thumbnail}` } alt='' width={ 2300 } height={ 840 } loading='lazy' className='h-[600px] md:h-[840px] w-full object-cover'/>
					</div>
				)) }
			</Slider>
		</div>
	);
};
