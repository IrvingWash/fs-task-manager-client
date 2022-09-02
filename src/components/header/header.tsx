import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './header.scss';

interface HeaderProps {
	username: string | null;
}

export function Header(props: HeaderProps): JSX.Element {
	const username = props.username;

	return (
		<header className={ styles.header }>
			<h3>
				<Link className={ styles.link } to='/'>
					Task manager
				</Link>
			</h3>
			<div>
				{
					props.username === null
						? (
							<div>
								<Link className={ styles.link } to={'/signup'}>Sign up</Link>
								<Link className={ styles.link } to={'/signin'}>Sign in</Link>
							</div>
						)
						: username
				}
			</div>
		</header>
	);
}
