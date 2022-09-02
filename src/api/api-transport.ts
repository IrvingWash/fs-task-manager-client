import {
	ApiAuthPayload,
	ApiTokens,
} from './api-objects-and-constants';

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
	private _signInUrl = new URL('signin', this._baseUrl);

	public async signIn(params: ApiAuthPayload): Promise<ApiTokens> {
		try {
			return await this._apiFetch({
				input: this._signInUrl,
				method: HttpMethod.Post,
				body: params,
			});
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
