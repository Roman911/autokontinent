import { FC } from 'react';
import Menu from './Menu';
import { AliasAll } from '@/models/alias';
import LanguageChanger from '@/components/Layout/Header/TopLine/LanguageChanger';
import Contacts from '@/components/Layout/Header/Contacts';
import { SettingsProps } from '@/models/settings';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const TopLine: FC<Props> = ({ alias, settings }) => {
	return (
		<section className='top-line w-full bg-blue-400'>
			<div className='container mx-auto max-w-7xl py-1 px-2 md:px-4'>
				<nav className='gap-2 2xl:gap-6 flex items-center justify-between'>
					<Contacts isTopLine={ true } settings={ settings } />
					<Menu alias={ alias } />
					<LanguageChanger />
				</nav>
			</div>
		</section>
	)
};

export default TopLine;
