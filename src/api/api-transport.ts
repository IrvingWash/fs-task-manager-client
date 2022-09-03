import {
	ApiAuthPayload,
	ApiAuthResult,
	ApiError,
	ApiTask,
	ApiTaskPayload,
	ApiTokens,
} from './api-objects-and-constants';

import { CredentialStorage } from './credential-storage';

export enum HttpMethod {
	Get = 'GET',
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
}

export interface IApiAuthTransport {
	signUp: (payload: ApiAuthPayload) => Promise<ApiAuthResult>;
	signIn: (payload: ApiAuthPayload) => Promise<ApiAuthResult>;
	refresh: () => Promise<ApiTokens>;
	logout: () => Promise<void>;
}

export interface IApiTasksTransport {
	tasks: () => Promise<ApiTask[]>;
	updateTask: (id: string, payload: ApiTaskPayload) => Promise<ApiTask>;
	createTask: (payload: ApiTaskPayload) => Promise<ApiTask>;
	deleteTask: (id: string) => Promise<ApiTask>;
}

interface ApiFetchParams {
	input: URL;
	method?: HttpMethod;
	body?: object;
}

function isApiError<T>(entity: T | ApiError): entity is ApiError {
	if ((entity as ApiError).statusCode !== undefined) {
		return true;
	} 

	return false;
}

export class ApiTransport {
	// TODO: Move to .env
	private _baseUrl = new URL('http://localhost:3333/api/');
	private _credentialStorage: CredentialStorage;

	private _authUrl = new URL('auth/', this._baseUrl);
	private _signInUrl = new URL('signin', this._authUrl);
	private _signUpUrl = new URL('signup', this._authUrl);
	private _refreshUrl = new URL('refresh', this._authUrl);
	private _logoutUrl = new URL('logout', this._authUrl);

	private _tasksUrl = new URL('tasks/', this._baseUrl);

	public constructor(credentialStorage: CredentialStorage) {
		this._credentialStorage = credentialStorage;
	}

	public signUp = async (payload: ApiAuthPayload): Promise<ApiAuthResult> => {
		const authResult = await this._apiFetch<ApiAuthResult>({
			input: this._signUpUrl,
			method: HttpMethod.Post,
			body: payload,
		});

		if (isApiError(authResult)) {
			throw new Error(authResult.message);
		}

		return authResult;
	};

	public signIn = async (payload: ApiAuthPayload): Promise<ApiAuthResult> => {
		const authResult = await this._apiFetch<ApiAuthResult>({
			input: this._signInUrl,
			method: HttpMethod.Post,
			body: payload,
		});

		if (isApiError(authResult)) {
			throw new Error(authResult.message);
		}

		return authResult;
	};

	public async refresh(): Promise<ApiTokens> {
		const authResult = await this._apiFetch<ApiTokens>({
			input: this._refreshUrl,
		});

		if (isApiError(authResult)) {
			throw new Error(authResult.message);
		}

		return authResult;
	}

	public logout = async (): Promise<void> => {
		try {
			await this._apiFetch<void>({
				input: this._logoutUrl,
			});
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	};

	public tasks = async (): Promise<ApiTask[]> => {
		const tasks = await this._apiFetch<ApiTask[]>({
			input: this._tasksUrl,
		});

		if (isApiError(tasks)) {
			throw new Error(tasks.message);
		}

		return tasks;
	};

	public updateTask = async (id: string, payload: ApiTaskPayload): Promise<ApiTask> => {
		const updatedTask = await this._apiFetch<ApiTask>({
			input: new URL(id, this._tasksUrl),
			method: HttpMethod.Patch,
			body: payload,
		});

		if (isApiError(updatedTask)) {
			throw new Error(updatedTask.message);
		}

		return updatedTask;
	};
	
	public createTask = async (payload: ApiTaskPayload): Promise<ApiTask> => {
		const task = await this._apiFetch<ApiTask>({
			input: this._tasksUrl,
			method: HttpMethod.Post,
			body: payload,
		});

		if (isApiError(task)) {
			throw new Error(task.message);
		}

		return task;
	};

	public deleteTask = async (id: string): Promise<ApiTask> => {
		const deletedTask = await this._apiFetch<ApiTask>({
			input: new URL(id, this._tasksUrl),
			method: HttpMethod.Delete,
		});

		if (isApiError(deletedTask)) {
			throw new Error(deletedTask.message);
		}

		return deletedTask;
	};

	private _apiFetch = async <ApiEntity>(params: ApiFetchParams): Promise<ApiEntity | ApiError> => {
		const {
			input,
			method = HttpMethod.Get,
			body,
		} = params;

		const accessToken = this._credentialStorage.get();

		const response = await fetch(
			input,
			{
				body: JSON.stringify(body),
				method,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': accessToken !== null
						? `Bearer ${accessToken}`
						: '',
				},
			}
		);

		return await response.json();
	};
}
