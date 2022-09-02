import React from 'react';

import { ApiAuthPayload } from '../api/api-objects-and-constants';
import { AuthForm, AuthFormAction } from '../components/auth-form/auth-form';

interface SignInPageProps {
	signIn: (params: ApiAuthPayload) => Promise<void>;
}

export function SignInPage(props: SignInPageProps): JSX.Element {
	return (
		<main>
			<AuthForm actionType={ AuthFormAction.SignIn } action={ props.signIn } />
		</main>
	);
}
