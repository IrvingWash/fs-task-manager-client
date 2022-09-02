import React, { useState } from 'react';

import { ApiAuthPayload } from '../../api/api-objects-and-constants';

import * as styles from './auth-form.scss';

export enum AuthFormAction {
	SignUp = 'Sign up',
	SignIn = 'Sign in',
}

interface AuthFormProps {
	actionType: AuthFormAction;
	action: (params: ApiAuthPayload) => Promise<void>
}

export function AuthForm(props: AuthFormProps): JSX.Element {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

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
			/>

			<button className={ styles.submitButton } type='submit'>
				{	props.actionType === AuthFormAction.SignIn
						? 'Sign in'
						: 'Sign up'
				}
			</button>
		</form>
	);

	function handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setUsername(event.target.value);
	}

	function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setPassword(event.target.value);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();

		props.action({ username, password });
	}
}
