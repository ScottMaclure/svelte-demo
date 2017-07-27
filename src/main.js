// Kickstart the application.

import Config from './config.js'
import SvelteDemoApp from './SvelteDemoApp.html'

const MIN_FILTER_LENGTH = 1 // allow for id searches

// A bit of fun with localStorage.
let oldCount = parseInt(window.localStorage.count || 0, 10)

// Support page refreshes with different routes.
let currentRoute = location.hash.slice(1) || Config.routes.default

// Top-level component is the "app".
var app = new SvelteDemoApp({
    target: document.querySelector('main'),
    data: {
        route: currentRoute,
        name: 'Scott',
        count: oldCount,
        items: [],
        sorting: {
            active: true,
            fieldName: 'id',
            order: 'asc'
        }
    }
})

// Listen for semantic event and fetch data from server. Can take event.
app.on('requestData', () =>
{
    fetch('data.json').then(function (response) {
        response.json().then(function (json) {
            app.setData(json)
        })
    })
})

app.on('deleteItem', event => {
    let items = app.get('items').filter(function (item) {
      return item.id !== event.id
    })
    app.set({ items: items })
})

app.on('filterData', event => {

    let originalItems = app.get('originalItems')
    let filterValue = event.filter && event.filter.toString().trim()

    // Not loaded yet.
    if (!originalItems) {
        return;
    }

    // If the filter is empty or blank, reset the filtering to the original items.
    if (filterValue === '' || filterValue.length < MIN_FILTER_LENGTH) {
        app.set({ items: originalItems })
        return
    }

    // Important: use originalItems, filter down, set into items.
    let items = originalItems.filter(function (item) {
        return Object.getOwnPropertyNames(item).some(function (fieldName) {
            // Handle numbers and strings the same way.
            if (-1 !== item[fieldName].toString().toLowerCase().indexOf(event.filter.trim().toLowerCase())) {
                return true
            }
            return false
        })
    })

    app.set({ items: items })
})

app.on('updateSorting', event => {

    let sorting = app.get('sorting')

    sorting.active = true // ensure flag is on

    // Wipe the order if switching fields.
    if (sorting.fieldName !== event.fieldName) {
        sorting.order = null
    }

    // Update which field is being sorted.
    sorting.fieldName = event.fieldName

    // Default asc on first click.
    sorting.order = sorting.order === 'asc' ? 'desc' : 'asc'

    app.set({ sorting: sorting })
})
