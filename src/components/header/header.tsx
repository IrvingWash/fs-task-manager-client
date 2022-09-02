import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as styles from './header.scss';

export function Header(): JSX.Element {
	const { pathname } = useLocation();

	return (
		<header className={ styles.header }>
			<h3>
				<Link className={ styles.link } to='/'>
					Task manager
				</Link>
			</h3>
			<div>
				{
					pathname !== '/signup' && pathname !== '/signin'
						? (
							<div>
								<Link className={ styles.link } to={'/signup'}>Sign up</Link>
								<Link className={ styles.link } to={'/signin'}>Sign in</Link>
							</div>
						)
						: null
				}
			</div>
		</header>
	);
}
