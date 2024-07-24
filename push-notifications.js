import { DENIED, GRANTED, PermissionDef } from './util.js';

export const pushNotifications = new PermissionDef('PUSH_NOTIFICATIONS', {
	async checkAsync() {
		const dismissed = localStorage.getItem('askPermissionPushNotificationDismissed');
		if (dismissed) return DENIED;

		const registration = await navigator.serviceWorker.ready;
		const existing = await registration.pushManager.getSubscription();
		return existing ? GRANTED : DENIED;
	},
	async askAsync(opts) {
		const result = await Notification.requestPermission();
		if (result === 'denied') return DENIED;

		const registration = await navigator.serviceWorker.ready;
		const sub = (
			await registration.pushManager.getSubscription()
		) || (
			await registration.pushManager.subscribe(opts)
		);
		if (sub) return JSON.parse(JSON.stringify(sub));
	},
});