import { useState, useEffect } from 'react';
import { PENDING, GRANTED, DENIED } from './src/util.js';
import { pushNotifications } from './src/push-notifications.js';

export const usePermission = (def) => {
	const [status, setStatus] = useState(def.status);
	useEffect(() => {
		def.checkAsync();
		return def.on(setStatus);
	}, [def]);
	return status;
};

export { PENDING, GRANTED, DENIED, pushNotifications };