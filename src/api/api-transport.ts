import {
	ApiAuthPayload,
	ApiTokens,
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

export class ApiTransport {
	// TODO: Move to .env
	private _baseUrl = new URL('http://localhost:3333/api');
	private _credentialStorage = new CredentialStorage();

	private _authBaseUrl = new URL('auth', this._baseUrl);
	private _signInUrl = new URL('signin', this._authBaseUrl);
	private _signUpUrl = new URL('signup', this._authBaseUrl);
	private _refreshUrl = new URL('refresh', this._authBaseUrl);

	public async signUp(params: ApiAuthPayload): Promise<void> {
		try {
			const tokens = await this._apiFetch<ApiTokens>({
				input: this._signUpUrl,
				method: HttpMethod.Post,
				body: params,
			});

			this._credentialStorage.save(tokens.accessToken);
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	public async signIn(params: ApiAuthPayload): Promise<void> {
		try {
			const tokens = await this._apiFetch<ApiTokens>({
				input: this._signInUrl,
				method: HttpMethod.Post,
				body: params,
			});

			this._credentialStorage.save(tokens.accessToken);
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	public async refresh(): Promise<void> {
		try {
			const tokens = await this._apiFetch<ApiTokens>({
				input: this._refreshUrl,
			});

			this._credentialStorage.save(tokens.accessToken);
		} catch (error: unknown) {
			throw new Error(error as string);
		}
	}

	private async _apiFetch<ApiEntity>(params: ApiFetchParams): Promise<ApiEntity> {
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
				},
			}
		);

		return await response.json();
	}
}
