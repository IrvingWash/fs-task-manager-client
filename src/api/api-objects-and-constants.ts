export interface ApiAuthPayload {
	username: string;
	password: string;
}

export interface ApiTokens {
	accessToken: string;
	refreshToken: string;
}
