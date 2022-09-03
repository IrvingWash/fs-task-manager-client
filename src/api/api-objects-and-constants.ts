export interface ApiAuthPayload {
	username: string;
	password: string;
}

export interface ApiError {
	statusCode: number;
	message: string;
}

export interface ApiAuthResult {
	tokens: {
		accessToken: string;
		refreshToken: string;
	},
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
