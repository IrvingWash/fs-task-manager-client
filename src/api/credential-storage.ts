export class CredentialStorage {
	private _storageKey = 'accessToken';

	public save(accessToken: string): void {
		localStorage.setItem(this._storageKey, accessToken);
	}

	public get(): string | null {
		return localStorage.getItem(this._storageKey);
	}

	public clear(): void {
		localStorage.removeItem(this._storageKey);
	}
}
