import React from 'react';

import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';

import { ApiTransport } from './api/api-transport';

import { Header } from './components/header/header';
import { SignInPage } from './pages/auth-pages/sign-in-page';
import { SignUpPage } from './pages/auth-pages/sign-up-page';

interface AppState {
	username: string | null;
}

export class App extends React.Component<Record<string, never>, AppState> {
	private _apiTransport = new ApiTransport();

	public constructor() {
		super({});

		this.state = {
			username: null,
		};
	}

	public override render(): JSX.Element {
		return (
			<BrowserRouter>
				<Header username={ this.state.username } />
				<Routes>
					<Route path='/signup' element={ <SignUpPage signUp={ this._apiTransport.signUp } getUsername={ this._getUsername } /> } />
					<Route path='/signin' element={ <SignInPage signIn={ this._apiTransport.signIn } getUsername={ this._getUsername } /> } />
				</Routes>
			</BrowserRouter>
		);
	}

	private _getUsername = (username: string): void => {
		console.log(username);

		this.setState({
			username,
		});
	};
}
