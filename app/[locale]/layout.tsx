import { ReactNode } from 'react';
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { twMerge } from 'tailwind-merge';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { getAliasAll, getSettings } from '@/app/api/api';
import '../colors.css';
import '../globals.css';
import { Language } from '@/models/language';
import LeftPanel from '@/components/Layout/LeftPanel';

const montserrat = localFont({
	src: [ {
		path: '../../public/fonts/Montserrat-Regular.ttf', weight: '400', style: 'normal',
	}, {
		path: '../../public/fonts/Montserrat-Medium.ttf', weight: '500', style: 'normal',
	}, {
		path: '../../public/fonts/Montserrat-SemiBold.ttf', weight: '600', style: 'normal',
	}, {
		path: '../../public/fonts/Montserrat-Bold.ttf', weight: '700', style: 'normal',
	}, ],
})

export default async function RootLayout({
																					 children, params,
																				 }: Readonly<{
	children: ReactNode; params: Promise<{ locale: Language }>;
}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAliasAll();

	return (<html lang={ locale } suppressHydrationWarning>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		</head>
		<body className={ twMerge(montserrat.className) }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } alias={ alias }/>
				<main className='xl:ml-32'>
					{ children }
				</main>
				<Footer settings={ response } alias={ alias }/>
				<LeftPanel />
			</NextIntlClientProvider>
		</StoreProvider>
		</body>
		</html>);
};
