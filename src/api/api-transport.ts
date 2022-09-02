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
	private _baseUrl = 'http://localhos:3333/api';

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
