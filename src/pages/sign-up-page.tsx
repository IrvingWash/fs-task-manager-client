import React from 'react';

import { AuthForm, AuthFormAction } from '../components/auth-form/auth-form';

export function SignUpPage(): JSX.Element {
	return (
		<main>
			<AuthForm action={ AuthFormAction.SignUp } />
		</main>
	);
}
