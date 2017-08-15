// Kickstart the application.

import Routing from './modules/Routing.js'
import {init as initCounter} from './modules/Counter.js'
import {init as initUsers} from './modules/Users.js'
import SvelteDemoApp from './components/SvelteDemoApp.html'

// Top-level component is the "app".
var app = new SvelteDemoApp({
    target: document.querySelector('main'),
    // TODO Keep the data definition in SvelteDemoApp instead, its "data API" then.
    data: {
        name: 'Scott',
        count: parseInt(window.localStorage.count || 0, 10), // A bit of fun with localStorage.
        items: [],
        filter: '',
        sorting: {
            active: true,
            fieldName: 'id',
            order: 'asc'
        }
    }
})

// Listen for semantic events and talk to servers, modify data etc.

// Routing machinery handled externally to component hierarhcy.
// Means Components are ignorant of URL for the most part, and simply react ot data changes to routeParts.
// TODO need Link components.

app.on('doPopState', () => {
    app.set({ routeParts: Routing.doPopState() })
})

app.on('doRoute', (event) => {
    app.set({ routeParts: Routing.doRoute(event) })
})

// Add counter functionality.
initCounter(app)

// Semantic event handling for users.
initUsers(app)