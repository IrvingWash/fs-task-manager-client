export interface Credentials {
	username: string;
	accessToken: string;
}

export class CredentialStorage {
	private _storageKey = 'accessToken';

	public save(username: string, accessToken: string): void {
		localStorage.setItem(this._storageKey, JSON.stringify({ username, accessToken }));
	}

	public get(): Credentials | null {
		const item = localStorage.getItem(this._storageKey);

		if (item === null) {
			return null;
		}

		return JSON.parse(item);
	}

	public clear(): void {
		localStorage.removeItem(this._storageKey);
	}
}
