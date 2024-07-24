import { useState, useEffect } from 'react';
import { PENDING, GRANTED, DENIED } from './util.js';
import { pushNotifications } from './push-notifications.js';

export const usePermission = (def) => {
	const [status, setStatus] = useState(def.status);
	useEffect(() => def.on(setStatus), [def]);
	return status;
};

export { PENDING, GRANTED, DENIED, pushNotifications };