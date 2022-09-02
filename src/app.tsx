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

export class App extends React.Component {
	private _apiTransport = new ApiTransport();

	public override render(): JSX.Element {
		return (
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/signup' element={ <SignUpPage singUp={ this._apiTransport.signUp } /> } />
					<Route path='/signin' element={ <SignInPage signIn={ this._apiTransport.signIn } /> } />
				</Routes>
			</BrowserRouter>
		);
	}
}
