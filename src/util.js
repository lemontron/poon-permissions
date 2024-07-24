export const GRANTED = 'granted';
export const PENDING = 'pending';
export const DENIED = 'denied';

export class PermissionDef {
	constructor(name, {askAsync, checkAsync, getConfigAsync}) {
		this.name = name;
		this.localStorageKey = `userDeclinedPermission[${this.name}]`;
		this.status = localStorage.getItem(this.localStorageKey) ? DENIED : PENDING;
		this._askAsync = askAsync;
		this._checkAsync = checkAsync;
		this.getConfigAsync = getConfigAsync;
		this.listeners = [];
	}

	_updateStatus = (val) => {
		if (this.status === val) return;
		if (val === GRANTED) localStorage.removeItem(this.localStorageKey);
		this.status = val;
		this.listeners.forEach(fn => fn(val));
	};

	on = (cb) => {
		this.listeners.push(cb);
		return () => this.listeners = this.listeners.filter(fn => fn !== cb);
	};

	checkAsync = async () => {
		const dismissed = localStorage.getItem(this.localStorageKey);
		if (dismissed) return DENIED;

		const status = await this._checkAsync();
		this._updateStatus(status);
	};

	askAsync = async () => {
		const result = await this._askAsync();
		if (result) {
			this._updateStatus(GRANTED);
			return result;
		} else {
			this._updateStatus(DENIED);
		}
	};

	userDecline = () => {
		localStorage.setItem(this.localStorageKey, 'true');
		this._updateStatus(DENIED);
	};
}