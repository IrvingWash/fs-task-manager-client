import {
	ApiAuthPayload,
	ApiAuthResult,
	ApiError,
} from './api-objects-and-constants';

import { CredentialStorage } from './credential-storage';

export enum HttpMethod {
	Get = 'GET',
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
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
	private _credentialStorage = new CredentialStorage();
	private _accessToken = this._credentialStorage.get();

	private _authUrl = new URL('auth/', this._baseUrl);
	private _signInUrl = new URL('signin', this._authUrl);
	private _signUpUrl = new URL('signup', this._authUrl);
	private _refreshUrl = new URL('refresh', this._authUrl);
	private _logoutUrl = new URL('logout', this._authUrl);

	public signUp = async (params: ApiAuthPayload): Promise<ApiAuthResult> => {
		const authResult = await this._apiFetch<ApiAuthResult>({
			input: this._signUpUrl,
			method: HttpMethod.Post,
			body: params,
		});

		if (isApiError(authResult)) {
			throw new Error(authResult.message);
		}

		this._accessToken = authResult.tokens.accessToken;
		this._credentialStorage.save(this._accessToken);

		return authResult;
	};

	public signIn = async (params: ApiAuthPayload): Promise<ApiAuthResult> => {
		try {
			const authResult = await this._apiFetch<ApiAuthResult>({
				input: this._signInUrl,
				method: HttpMethod.Post,
				body: params,
			});

			if (isApiError(authResult)) {
				throw new Error(authResult.message);
			}

			this._accessToken = authResult.tokens.accessToken;
			this._credentialStorage.save(this._accessToken);

			return authResult;
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	};

	public async refresh(): Promise<void> {
		try {
			const authResult = await this._apiFetch<ApiAuthResult>({
				input: this._refreshUrl,
			});

			if (isApiError(authResult)) {
				throw new Error(authResult.message);
			}

			this._credentialStorage.save(authResult.tokens.accessToken);
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	public async logout(): Promise<void> {
		try {
			await this._apiFetch({
				input: this._logoutUrl,
			});

			this._credentialStorage.clear();
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	private _apiFetch = async <ApiEntity>(params: ApiFetchParams): Promise<ApiEntity | ApiError> => {
		const {
			input,
			method = HttpMethod.Get,
			body,
		} = params;

		const response = await fetch(
			input,
			{
				body: JSON.stringify(body),
				method,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': this._accessToken !== null
						? `Bearer ${this._accessToken}`
						: '',
				},
			}
		);

		return await response.json();
	};
}
