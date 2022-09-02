import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiAuthPayload, ApiAuthResult } from '../../api/api-objects-and-constants';

import * as styles from './auth-form.scss';

export enum AuthFormAction {
	SignUp = 'Sign up',
	SignIn = 'Sign in',
}

interface AuthFormProps {
	actionType: AuthFormAction;
	action: (params: ApiAuthPayload) => Promise<ApiAuthResult>
	updateUsername: (username: string) => void;
}

export function AuthForm(props: AuthFormProps): JSX.Element {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const {
		actionType,
		action,
		updateUsername,
	} = props;

	return (
		<form className={ styles.authForm } onSubmit={ handleSubmit }>
			<label className={ styles.label } htmlFor='username'>Username</label>
			<input
				className={ styles.formInput }
				type='text'
				placeholder='Username'
				name='username'
				required
				minLength={ 4 }
				value={ username }
				onChange={ handleUsernameInput }
				onFocus={ handleInputFocus }
			/>

			<label className={ styles.label } htmlFor='password'>Password</label>
			<input
				className={ styles.formInput }
				type='password'
				placeholder='Password'
				name='password'
				required
				minLength={ 6 }
				value={ password }
				onChange={ handlePasswordInput }
				onFocus={ handleInputFocus }
			/>

			<button className={ styles.submitButton } type='submit'>
				{	actionType === AuthFormAction.SignIn
						? 'Sign in'
						: 'Sign up'
				}
			</button>

			{ error &&
					<div className={ styles.error }>{ error }</div>
			}
		</form>
	);

	function handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setUsername(event.target.value);
	}

	function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setPassword(event.target.value);
	}

	function handleInputFocus(): void {
		if (error !== null) {
			setError(null);
		}
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();

		try {
			const authorizationResult = await action({ username, password });

			updateUsername(authorizationResult.username);
			
			navigate('/');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setError(error.message);
		}
	}
}
