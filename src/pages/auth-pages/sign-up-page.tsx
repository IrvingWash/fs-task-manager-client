import React from 'react';

import { ApiAuthPayload } from '../../api/api-objects-and-constants';
import { AuthForm, AuthFormAction } from '../../components/auth-form/auth-form';

interface SignUpPageProps {
	signUp: (params: ApiAuthPayload) => Promise<void>;
}

export function SignUpPage(props: SignUpPageProps): JSX.Element {
	const { signUp } = props;

	return (
		<main>
			<AuthForm
				actionType={ AuthFormAction.SignUp }
				action={ signUp }
			/>
		</main>
	);
}
