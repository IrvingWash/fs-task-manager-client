import React from 'react';

import { ApiAuthPayload, ApiAuthResult } from '../../api/api-objects-and-constants';
import { AuthForm, AuthFormAction } from '../../components/auth-form/auth-form';

interface SignInPageProps {
	signIn: (params: ApiAuthPayload) => Promise<ApiAuthResult>;
	getUsername: (username: string) => void;
}

export function SignInPage(props: SignInPageProps): JSX.Element {
	const { signIn, getUsername } = props;

	return (
		<main>
			<AuthForm actionType={ AuthFormAction.SignIn } action={ signIn } getUsername={ getUsername } />
		</main>
	);
}
