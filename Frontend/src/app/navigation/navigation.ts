import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'application',
        title    : 'Application',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'NAV.DASHBOARD',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard'
            },
            {
                id       : 'sink',
                title    : 'Sink',
                translate: 'NAV.SINK',
                type     : 'item',
                icon     : 'local_car_wash',
                url      : '/sink'
            }
        ]
    },
    {
        id       : 'setting',
        title    : 'Setting',
        translate: 'NAV.SETTING',
        type     : 'group',
        children : [
            {
                id       : 'service',
                title    : 'Service',
                translate: 'NAV.SERVICE',
                type     : 'item',
                icon     : 'settings',
                url      : '/service'
            }
        ]
    }
];
