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
import { TasksPage } from './pages/tasks-page/tasks-page';

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
				<Header 
					username={ this.state.username }
					logout={ this._apiTransport.logout }
					updateUsername={ this._updateUsername }
				/>

				<Routes>
					<Route path='/' element={ <TasksPage /> } />
					<Route path='/signup' element={
						<SignUpPage
							signUp={ this._apiTransport.signUp }
							updateUsername={ this._updateUsername }
						/>
					} />
					<Route path='/signin' element={
						<SignInPage
							signIn={ this._apiTransport.signIn }
							updateUsername={ this._updateUsername }
						/>
					} />
				</Routes>
			</BrowserRouter>
		);
	}

	private _updateUsername = (username: string | null): void => {
		this.setState({
			username,
		});
	};
}
