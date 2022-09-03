import { ApiAuthPayload, ApiAuthResult } from '../api/api-objects-and-constants';
import { ApiTransport, IApiAuthTransport } from '../api/api-transport';
import { CredentialStorage } from '../api/credential-storage';

interface AuthParams {
	apiTransport: ApiTransport;
	credentialStorage: CredentialStorage;
	updateUsername: (username: string) => void;
}

export class Auth {
	private _apiTransport: IApiAuthTransport;
	private _credentialStorage: CredentialStorage;
	private _updateUsername: (username: string) => void;

	public constructor(params: AuthParams) {
		const {
			apiTransport,
			credentialStorage,
			updateUsername,
		} = params;

		this._apiTransport = apiTransport;
		this._credentialStorage = credentialStorage;
		this._updateUsername = updateUsername;
	}

	public signIn = async (payload: ApiAuthPayload): Promise<void> => {
		const authResult = await this._apiTransport.signIn(payload);

		this._onAuthorized(authResult);
	};

	public signUp = async (payload: ApiAuthPayload): Promise<void> => {
		const authResult = await this._apiTransport.signUp(payload);

		this._onAuthorized(authResult);
	};

	public refresh = async (): Promise<void> => {
		const authResult = await this._apiTransport.refresh();

		const credentials = this._credentialStorage.get();

		this._credentialStorage.save(credentials?.username ?? '', authResult.accessToken);
	};

	public logout = async (): Promise<void> => {
		await this._apiTransport.logout();

		this._credentialStorage.clear();
	};

	private _onAuthorized = (authResult: ApiAuthResult): void => {
		this._updateUsername(authResult.username);
		this._credentialStorage.save(authResult.username, authResult.tokens.accessToken);
	};
}
