import React from 'react';

import { AuthForm, AuthFormAction } from '../components/auth-form/auth-form';

export function SignInPage(): JSX.Element {
	return (
		<main>
			<AuthForm action={ AuthFormAction.SignUp } />
		</main>
	);
}
