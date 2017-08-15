const ROUTE_DEFAULT = 'Splash'

export default {
    routes: {
        default: ROUTE_DEFAULT,
        splash: ROUTE_DEFAULT,
        listUsers: 'ListUsers',
        editUser: 'EditUser',
        testBroken: 'TestBroken'
    },
    unicodes: {
        delete: '\u274C',
        edit: '\u270E'
    },
    messages: {
        displayTime: 2000,
        types: {
            default: 'default',
            success: 'success',
            info: 'info',
            warning: 'warning',
            danger: 'danger',
            inverse: 'inverse'
        }
    }
}