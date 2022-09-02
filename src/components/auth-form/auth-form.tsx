import React, { useState } from 'react';

export enum AuthFormAction {
	SignUp = 'Sign up',
	SignIn = 'Sign in',
}

interface AuthFormProps {
	action: AuthFormAction;
}

export function AuthForm(props: AuthFormProps): JSX.Element {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<form>
			<label htmlFor='username'>Username</label>
			<input
				type='text'
				placeholder='Username'
				name='username'
				minLength={ 4 }
				value={ username }
				onChange={ handleUsernameInput }
			/>

			<label htmlFor='password'>Password</label>
			<input
				type='password'
				placeholder='Password'
				name='password'
				minLength={ 6 }
				value={ password }
				onChange={ handlePasswordInput }
			/>

			<button type='submit'>
				{	props.action === AuthFormAction.SignIn
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
}
