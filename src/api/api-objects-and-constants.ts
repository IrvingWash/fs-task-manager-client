export interface ApiAuthPayload {
	username: string;
	password: string;
}

export interface ApiError {
	statusCode: number;
	message: string;
}

export interface ApiTokens {
	accessToken: string;
	refreshToken: string;
}

export interface ApiAuthResult {
	tokens: ApiTokens;
	username: string;
}

export interface ApiTask {
	_id: string;
	title: string;
	status: ApiTaskStatus;
	description?: string;
}

export enum ApiTaskStatus {
	Open = 'Open',
	Done = 'Done',
}

export interface ApiTaskPayload {
	title?: string;
	status?: ApiTaskStatus;
	description?: string;
}
