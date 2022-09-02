import React from 'react';

import { ApiAuthPayload, ApiAuthResult } from '../../api/api-objects-and-constants';
import { AuthForm, AuthFormAction } from '../../components/auth-form/auth-form';

interface SignUpPageProps {
	signUp: (params: ApiAuthPayload) => Promise<ApiAuthResult>;
	getUsername: (username: string) => void;
}

export function SignUpPage(props: SignUpPageProps): JSX.Element {
	const { signUp, getUsername } = props;

	return (
		<main>
			<AuthForm actionType={ AuthFormAction.SignUp } action={ signUp } getUsername={ getUsername } />
		</main>
	);
}
