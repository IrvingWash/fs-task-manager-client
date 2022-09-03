import React from 'react';

import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';

import { ApiTransport } from './api/api-transport';
import { CredentialStorage } from './api/credential-storage';
import { Auth } from './auth/auth';
import { Header } from './components/header/header';
import { TasksViewModel } from './models/tasks-view-model';
import { SignInPage } from './pages/auth-pages/sign-in-page';
import { SignUpPage } from './pages/auth-pages/sign-up-page';
import { TasksPage } from './pages/tasks-page/tasks-page';

interface AppState {
	username: string | null;
}

export class App extends React.Component<Record<string, never>, AppState> {
	private _apiTransport: ApiTransport;
	private _credentialStorage = new CredentialStorage();
	private _auth: Auth;
	private _taskModel: TasksViewModel;

	public constructor() {
		super({});

		this.state = {
			username: null,
		};

		this._apiTransport = new ApiTransport(this._credentialStorage);

		this._auth = new Auth({
			apiTransport: this._apiTransport,
			credentialStorage: this._credentialStorage,
			updateUsername: this._updateUsername,
		});

		this._taskModel = new TasksViewModel(this._apiTransport);

	}

	public override render(): JSX.Element {
		return (
			<BrowserRouter>
				<Header 
					username={ this.state.username }
					logout={ this._auth.logout }
					updateUsername={ this._updateUsername }
				/>

				<Routes>
					<Route path='/' element={ <TasksPage model={ this._taskModel } /> } />
					<Route path='/signup' element={
						<SignUpPage
							signUp={ this._auth.signUp }
						/>
					} />
					<Route path='/signin' element={
						<SignInPage
							signIn={ this._auth.signIn }
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
