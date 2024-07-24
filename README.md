# Simple permission management with `poon-permissions`!!!

The easiest way to manage permissions in your PWA.

Currently supports only Push Notifications, which is what needs the most help. As you know, browser API's are crazy,
which is why this helper library exists.

## React Example

This is a React component that will return a button if the user has denied push notifications.

``` javascript
import React, { useEffect } from 'react';
import { Button } from 'poon-ui';
import { usePermission, pushNotifications, DENIED } from 'poon-permissions';
import { setupPush } from '../util/permissions';

const PushNotificationsButton = () => {
	const status = usePermission(pushNotifications);

	useEffect(() => {
		setupPush();
	}, []);

	if (status === DENIED) return (
		<Button icon="notifications" onPress={setupPush}/>
	);
	return null;
};

export default PushNotificationsButton;
```

Here is basic code for `setupPush()` which is called when the button is clicked.

```javascript
import { showAlert, toast } from 'poon-ui';
import { callMethod } from './util';
import { pushNotifications, GRANTED } from 'poon-permissions';

export const setupPush = async () => {
    const status = await pushNotifications.askAsync();
    if (status === GRANTED) callMethod('PushNotifications', {
        'data': await pushNotifications.getConfigAsync(),
        'onSuccess': () => toast('Push subscribed'),
    });
};
```

## Package Exports

| Name                | Description                                  |
|---------------------|----------------------------------------------|
| `usePermission`     | Used in React, returns the status            |
| `GRANTED`           | Constant for Granted status                  |
| `PENDING`           | Constant for Pending status (initial status) |
| `DENIED`            | Constant for Denied status                   |
| `pushNotifications` | API for Push Notifications permission!       |

## Documentation for `pushNotifications`

| Method           | Description                                            |
|------------------|--------------------------------------------------------|
| `checkAsync`     | Check the permission status (GRANTED, PENDING, DENIED) |
| `askAsync`       | Present the system modal and return status             |
| `getConfigAsync` | Get the configuration (make sure you askAsync first!)  |
| `userDecline`    | Call to make checkAsync always return DENIED status    |
| `on`             | Callback to fire when permission status changes        |