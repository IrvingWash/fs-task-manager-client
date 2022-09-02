import React from 'react';

import { ApiAuthPayload } from '../../api/api-objects-and-constants';
import { AuthForm, AuthFormAction } from '../../components/auth-form/auth-form';

interface SignUpPageProps {
	singUp: (params: ApiAuthPayload) => Promise<void>;
}

export function SignUpPage(props: SignUpPageProps): JSX.Element {
	return (
		<main>
			<AuthForm actionType={ AuthFormAction.SignUp } action={ props.singUp } />
		</main>
	);
}
