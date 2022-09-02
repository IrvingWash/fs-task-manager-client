import React from 'react';

import { ApiAuthPayload, ApiAuthResult } from '../../api/api-objects-and-constants';
import { AuthForm, AuthFormAction } from '../../components/auth-form/auth-form';

interface SignInPageProps {
	signIn: (params: ApiAuthPayload) => Promise<ApiAuthResult>;
	updateUsername: (username: string) => void;
}

export function SignInPage(props: SignInPageProps): JSX.Element {
	const { signIn, updateUsername } = props;

	return (
		<main>
			<AuthForm actionType={ AuthFormAction.SignIn } action={ signIn } updateUsername={ updateUsername } />
		</main>
	);
}
