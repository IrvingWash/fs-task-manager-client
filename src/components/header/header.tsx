import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as styles from './header.scss';

export function Header(): JSX.Element {
	const match = useLocation();

	return (
		<header className={ styles.header }>
			<h3>
				<Link className={ styles.link } to='/'>
					Task manager
				</Link>
			</h3>
			<div>
				{
					match.pathname !== '/signup'
						? <Link className={ styles.link } to={'/signup'}>Sign up</Link>
						: null
				}
			</div>
		</header>
	);
}
