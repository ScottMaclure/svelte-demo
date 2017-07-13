// Kickstart the application.

import HelloWorld from './HelloWorld.html'

// A bit of fun with localStorage.
let oldCount = parseInt(window.localStorage.count || 0, 10)

// Top-level component is the "app".
var app = new HelloWorld({
    target: document.querySelector('main'),
    data: {
        name: 'Scott',
        count: oldCount,
        items: []
    }
})

// Listen for semantic event and fetch data from server.
app.on('requestData', event => {
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
    app.set({ items:  items })
})