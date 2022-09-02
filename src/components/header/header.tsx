import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as styles from './header.scss';

interface HeaderProps {
	username: string | null;
	updateUsername: (username: string | null) => void;
	logout: () => Promise<void>;
}

export function Header(props: HeaderProps): JSX.Element {
	const navigate = useNavigate();

	const {
		username,
		updateUsername,
		logout,
	} = props;

	return (
		<header className={ styles.header }>
			<h3>
				<Link className={ styles.link } to='/'>
					Task manager
				</Link>
			</h3>

			<div className={ styles.userBlock }>
				{ username === null
					? (
						<>
							<Link className={ styles.link } to={'/signup'}>Sign up</Link>
							<Link className={ styles.link } to={'/signin'}>Sign in</Link>
						</>
					) : (
						<>
							<h4 className={ styles.username }>
								{ username }
							</h4>
							<button className={ styles.logoutButton } onClick={ handleLogout }>Logout</button>
						</>
					)
				}
			</div>
		</header>
	);

	async function handleLogout(): Promise<void> {
		try {
			await logout();
		} catch (error: unknown) {
			throw new Error(error as string);
		}

		updateUsername(null);
		navigate('/signin');
	}
}
