import { SVGProps } from 'react';

const BrandsIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="30px"
		height="30px"
		fill="none"
		fillRule='evenodd'
		clipRule='evenodd'
		viewBox="0 0 30 30"
		{ ...props }
	>
		<path
			xmlns="http://www.w3.org/2000/svg"
			d="M23.2213 1.875H15.4688L20.4018 8.45273L23.2213 1.875ZM6.77871 1.875L9.59824 8.45273L14.5312 1.875H6.77871ZM15 4.3752L11.25 9.375H18.75L15 4.3752ZM24.7822 2.9918L22.0465 9.375H28.5938L24.7822 2.9918ZM5.21777 2.9918L1.34766 9.375H7.95352L5.21777 2.9918ZM8.59453 11.25H1.40625L14.4609 28.125H14.492L8.59453 11.25ZM21.4055 11.25L15.508 28.125H15.5391L28.5938 11.25H21.4055ZM19.3002 11.25H10.6998L15 23.4375L19.3002 11.25Z"
			fill="CurrentColor"
		/>
	</svg>
);

export default BrandsIcon;
