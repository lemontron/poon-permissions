export const GRANTED = 'granted';
export const PENDING = 'pending';
export const DENIED = 'denied';

export class PermissionDef {
	constructor(name, {askAsync, checkAsync}) {
		this.name = name;
		this.status = PENDING;
		this._askAsync = askAsync;
		this._checkAsync = checkAsync;
		this.listeners = [];

		this.on(val => {
			if (val === GRANTED) localStorage.removeItem('askPermissionPushNotificationDismissed');
		});
	}

	_updateStatus = (val) => {
		if (this.status === val) return;
		this.status = val;
		this.listeners.forEach(fn => fn(val));
	};

	on = (cb) => {
		this.listeners.push(cb);
		return () => this.listeners = this.listeners.filter(fn => fn !== cb);
	};

	checkAsync = async () => {
		const status = this._checkAsync();
		this._updateStatus(status);
	};

	askAsync = async () => {
		const status = this._askAsync();
		this._updateStatus(status);
	};
}