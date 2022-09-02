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
