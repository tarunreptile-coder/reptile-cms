import React from 'react';
import { Notification } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const defaultPlacement = 'bottomEnd';
class _PrivateNotification {
    static open({
        title = 'Notification',
        placement = defaultPlacement,
        description = '',
    }) {
        Notification.open({ title, description, placement });
    }
    static info({
        title = 'Info',
        placement = defaultPlacement,
        description = '',
    }) {
        Notification.info({ title, description, placement });
    }
    static success({
        title = 'Success',
        placement = defaultPlacement,
        description = '',
    }) {
        Notification.success({ title, description, placement });
    }
    static warning({
        title = 'Warning',
        placement = defaultPlacement,
        description = '',
    }) {
        Notification.warning({ title, description, placement });
    }
    static error({
        title = 'Error',
        placement = defaultPlacement,
        description = '',
        duration = undefined
    }) {
        Notification.error({ title, description, placement, duration });
    }
}

export default _PrivateNotification;
